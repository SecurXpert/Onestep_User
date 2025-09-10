import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchWithAuth } from '../utils/api';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

const ProfileContent = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const medicalFileInputRef = useRef(null);

  const defaultProfile = {
    patient_id: user?.patient_id || '',
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || '',
    maritalStatus: user?.maritalStatus || '',
    address: user?.address || '',
    bloodGroup: user?.bloodGroup || '',
    region: user?.region || '',
    dob: user?.dob || '',
    medical_history: user?.medical_history || false,
    medical_document: user?.medical_document || null,
  };

  const [profile, setProfile] = useState(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [medicalDocument, setMedicalDocument] = useState(null);
  const [selectedMedicalDocument, setSelectedMedicalDocument] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login-register');
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetchWithAuth('https://api.onestepmedi.com:8000/profile/me', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log('Fetch profile error response:', errorData);
          throw new Error(`https ${response.status}: ${errorData.detail || 'Failed to fetch profile'}`);
        }

        const data = await response.json();
        console.log('Fetched profile data:', data);
        const formattedProfile = {
          patient_id: data.patient_id || '',
          name: data.name || '',
          email: data.email || '',
          phone: data.phone_number || '',
          gender: data.gender || '',
          maritalStatus: data.marital_status || '',
          address: data.address || '',
          bloodGroup: data.blood_group || '',
          region: data.region || '',
          dob: data.dob || '',
          medical_history: data.medical_history || false,
          medical_document: data.medical_document || null,
        };

        setProfile(formattedProfile);
        if (data.profile_picture) {
          const imageUrl = `${data.profile_picture}?t=${Date.now()}`;
          console.log('Setting profile image URL:', imageUrl);
          try {
            await new Promise((resolve, reject) => {
              const img = new Image();
              img.src = imageUrl;
              img.onload = () => resolve();
              img.onerror = () => reject(new Error('Failed to load profile image'));
            });
            setProfileImage(imageUrl);
            sessionStorage.setItem('profileImage', imageUrl);
          } catch (err) {
            console.error('Failed to load profile image:', imageUrl);
            setError('Failed to load profile image. Please check if the image exists.');
            setProfileImage(null);
            sessionStorage.setItem('profileImage', '');
          }
        } else {
          setProfileImage(null);
          sessionStorage.setItem('profileImage', '');
        }
        if (data.medical_document) {
          const docUrl = `${data.medical_document}?t=${Date.now()}`;
          console.log('Setting medical document URL:', docUrl);
          setMedicalDocument(docUrl);
        } else {
          setMedicalDocument(null);
        }
        setError('');
        sessionStorage.setItem('userProfile', JSON.stringify(formattedProfile));
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile. Please try again.');
        if (err.message.includes('401')) {
          logout();
          navigate('/login-register');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isLoggedIn, navigate, logout]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetchWithAuth(`https://api.onestepmedi.com:8000/profile`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Profile deletion error response:', errorData);
        throw new Error(`https ${response.status}: ${errorData.detail || 'Profile deletion failed'}`);
      }

      console.log('Profile deleted successfully');
      sessionStorage.removeItem('userProfile');
      sessionStorage.removeItem('profileImage');
      logout();
      navigate('/login-register');
    } catch (error) {
      console.error('Error deleting profile:', error);
      setError(error.message || 'Failed to delete profile. Please try again.');
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === 'checkbox' ? checked : name === 'medical_history' ? value === 'true' : value,
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setSelectedFile(null);
      setSelectedMedicalDocument(null);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid image (JPEG, PNG, or GIF)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      if (file.size === 0) {
        setError('Selected image is empty. Please choose a valid image.');
        return;
      }
      console.log('Selected profile picture:', { name: file.name, type: file.type, size: file.size });
      setProfileImage(URL.createObjectURL(file));
      setSelectedFile(file);
      setError('');
    }
  };

  const handleMedicalDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid medical document (JPEG, PNG, GIF, or PDF)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Medical document size must be less than 5MB');
        return;
      }
      if (file.size === 0) {
        setError('Selected medical document is empty. Please choose a valid file.');
        return;
      }
      console.log('Selected medical document:', { name: file.name, type: file.type, size: file.size });
      setMedicalDocument(URL.createObjectURL(file));
      setSelectedMedicalDocument(file);
      setError('');
    }
  };

  const handlePlusClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleMedicalDocPlusClick = () => {
    if (medicalFileInputRef.current) {
      medicalFileInputRef.current.click();
    }
  };

  const handleImageError = (e) => {
    console.error('Image load error, falling back to placeholder');
    setError('Failed to load profile image. Please check if the image exists.');
    // keep same behavior; only ensure URL schema is valid
    e.target.src = 'https://placehold.co/120x120?text=Profile';
  };

  const handleMedicalDocError = () => {
    console.error('Medical document load error, clearing document');
    setError('Failed to load medical document. Please check if the file exists.');
    setMedicalDocument(null);
  };

  const handleSave = async () => {
    try {
      if (!profile.name || !profile.email || !profile.phone || !profile.dob) {
        setError('Name, email, phone number, and date of birth are required');
        return;
      }

      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      formData.append('phone_number', profile.phone);
      formData.append('gender', profile.gender || '');
      formData.append('marital_status', profile.maritalStatus || '');
      formData.append('address', profile.address || '');
      formData.append('blood_group', profile.bloodGroup || '');
      formData.append('region', profile.region || '');
      formData.append('dob', profile.dob);
      formData.append('medical_history', profile.medical_history.toString());
      if (selectedFile) {
        formData.append('profile_picture', selectedFile);
        console.log('Appending profile picture:', selectedFile.name);
      }
      if (selectedMedicalDocument) {
        formData.append('medical_document', selectedMedicalDocument);
        console.log('Appending medical document:', selectedMedicalDocument.name);
      }

      const formDataEntries = {};
      for (let [key, value] of formData.entries()) {
        formDataEntries[key] = value instanceof File ? `File: ${value.name}` : value;
      }
      console.log('Profile update payload:', formDataEntries);

      const response = await fetchWithAuth('https://api.onestepmedi.com:8000/profile/me', {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Profile update error response:', errorData);
        throw new Error(`https ${response.status}: ${errorData.detail || 'Profile update failed'}`);
      }

      const updatedProfile = await response.json();
      console.log('Backend response:', updatedProfile);

      const formattedProfile = {
        patient_id: updatedProfile.patient_id || profile.patient_id || '',
        name: updatedProfile.name || '',
        email: updatedProfile.email || '',
        phone: updatedProfile.phone_number || '',
        gender: updatedProfile.gender || '',
        maritalStatus: updatedProfile.marital_status || '',
        address: updatedProfile.address || '',
        bloodGroup: updatedProfile.blood_group || '',
        region: updatedProfile.region || '',
        dob: updatedProfile.dob || '',
        medical_history: updatedProfile.medical_history || false,
        medical_document: updatedProfile.medical_document || null,
      };

      let newImageUrl = updatedProfile.profile_picture;
      if (newImageUrl) {
        newImageUrl += `?t=${Date.now()}`;
        console.log('Updating profile image URL:', newImageUrl);
        try {
          await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = newImageUrl;
            img.onload = () => resolve();
            img.onerror = () => reject(new Error('Failed to load updated profile image'));
          });
          setProfileImage(newImageUrl);
          sessionStorage.setItem('profileImage', newImageUrl);
        } catch (err) {
          console.error('Image preload error:', err.message);
          setError('Failed to load profile image after upload. Please try again.');
          setProfileImage(null);
          sessionStorage.setItem('profileImage', '');
        }
      } else if (selectedFile) {
        console.warn('No profile_picture in response');
        setError('Profile picture upload failed. Please try again.');
        setProfileImage(null);
        sessionStorage.setItem('profileImage', '');
      }

      if (updatedProfile.medical_document) {
        const docUrl = `${updatedProfile.medical_document}?t=${Date.now()}`;
        console.log('Updating medical document URL:', docUrl);
        setMedicalDocument(docUrl);
      } else if (selectedMedicalDocument) {
        console.warn('No medical_document in response');
        setError('Medical document upload failed. Please try again.');
        setMedicalDocument(null);
      }

      console.log('Saved Profile:', formattedProfile);
      console.log('Profile Image URL:', newImageUrl || 'None');
      console.log('Medical Document URL:', updatedProfile.medical_document || 'None');

      setProfile(formattedProfile);
      setIsEditing(false);
      setSelectedFile(null);
      setSelectedMedicalDocument(null);
      setError('');
    } catch (error) {
      console.error('Error saving profile:', error);
      setError(error.message || 'Failed to save profile or upload files. Please try again.');
      if (selectedFile) {
        setProfileImage(null);
        sessionStorage.setItem('profileImage', '');
      }
      if (selectedMedicalDocument) {
        setMedicalDocument(null);
      }
    }
  };

  const renderField = (label, name, type = 'text', isDropdown = false, options = []) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 p-4 bg-gray-50 rounded-lg mb-3 shadow-sm">
      <label className="w-full sm:w-48 md:w-56 font-semibold text-sm md:text-base text-gray-700">
        {label}:
      </label>
      {isEditing && name !== 'patient_id' ? (
        isDropdown ? (
          <select
            name={name}
            value={profile[name]}
            onChange={handleChange}
            className="mt-2 sm:mt-0 flex-1 border border-gray-300 p-3 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition text-sm md:text-base"
          >
            <option value="">Select {label}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={profile[name]}
            onChange={handleChange}
            className="mt-2 sm:mt-0 flex-1 border border-gray-300 p-3 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition text-sm md:text-base"
          />
        )
      ) : (
        <div className="mt-2 sm:mt-0 flex-1 text-gray-800 font-medium text-sm md:text-base break-words">
          {name === 'medical_history' ? (profile[name] ? 'Yes' : 'No') : profile[name] || `Not Provided`}
        </div>
      )}
    </div>
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
        {loading && (
          <p className="text-gray-600 mb-4 text-sm md:text-base">Loading profile...</p>
        )}
        {error && (
          <p className="text-red-600 mb-4 text-sm md:text-base">{error}</p>
        )}
        {!profile.patient_id && (
          <p className="text-red-600 mb-4 text-sm md:text-base">
            Your profile is incomplete. Please ensure all required fields, including Patient ID, are filled.
          </p>
        )}

        {/* Header: avatar + identity + actions */}
        <div className="flex flex-col md:flex-row md:items-start items-center justify-between gap-4 md:gap-6 mb-6">
          <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto">
            <div className="relative">
              <img
                src={profileImage || 'https://placehold.co/120x120?text=Profile'}
                alt="Profile"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-purple-100 shadow-md"
                onError={handleImageError}
              />
              {isEditing && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute top-0 left-0 opacity-0 w-20 h-20 sm:w-24 sm:h-24 cursor-pointer"
                    title="Upload Profile Picture"
                    ref={fileInputRef}
                  />
                  <FaPlus
                    className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-1.5 w-7 h-7 cursor-pointer hover:bg-purple-700 transition shadow-sm"
                    title="Upload Profile Picture"
                    onClick={handlePlusClick}
                  />
                </>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-purple-800">
                {profile.name || 'Your Name'}
              </h1>
              <p className="text-sm sm:text-base text-gray-500">
                {profile.email || 'Your Email'}
              </p>
            </div>
          </div>

          <div className="flex gap-4 self-center md:self-start">
            <FaEdit
              className="text-xl text-purple-600 cursor-pointer hover:text-purple-800 transition"
              title={isEditing ? 'Cancel' : 'Edit'}
              onClick={handleEditToggle}
            />
            <FaTrash
              className="text-xl text-red-600 cursor-pointer hover:text-red-800 transition"
              title="Delete Profile"
              onClick={handleDelete}
            />
          </div>
        </div>

        <hr className="border-t-2 border-purple-100 mb-6" />

        {/* Fields */}
        <div className="space-y-2">
          {renderField('Patient ID', 'patient_id')}
          {renderField('Name', 'name')}
          {renderField('Email', 'email')}
          {renderField('Phone Number', 'phone')}
          {renderField('Gender', 'gender', 'text', true, ['Male', 'Female', 'Other'])}
          {renderField('Marital Status', 'maritalStatus', 'text', true, ['Single', 'Married', 'Divorced'])}
          {renderField('Address', 'address')}
          {renderField('Blood Group', 'bloodGroup')}
          {renderField('Region', 'region')}
          {renderField('Date of Birth', 'dob', 'date')}
          {renderField('Medical History', 'medical_history', 'text', true, ['true', 'false'])}

          {/* Medical Document */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 p-4 bg-gray-50 rounded-lg mb-3 shadow-sm">
            <label className="w-full sm:w-48 md:w-56 font-semibold text-sm md:text-base text-gray-700">
              Medical Document:
            </label>
            {isEditing ? (
              <div className="mt-2 sm:mt-0 flex items-center gap-3 flex-wrap">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleMedicalDocumentUpload}
                  className="hidden"
                  ref={medicalFileInputRef}
                />
                <button
                  onClick={handleMedicalDocPlusClick}
                  type="button"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2 text-sm md:text-base"
                >
                  <FaPlus /> Upload Medical Document
                </button>
                {medicalDocument && (
                  <a
                    href={medicalDocument}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm md:text-base"
                    onError={handleMedicalDocError}
                  >
                    View Current Document
                  </a>
                )}
              </div>
            ) : (
              <div className="mt-2 sm:mt-0 flex-1 text-gray-800 font-medium text-sm md:text-base break-words">
                {medicalDocument ? (
                  <a
                    href={medicalDocument}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm md:text-base"
                    onError={handleMedicalDocError}
                  >
                    View Medical Document
                  </a>
                ) : (
                  'Not Provided'
                )}
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition font-semibold shadow-md text-sm md:text-base"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;
