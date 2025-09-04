import React, { useState } from 'react';
import AddDoctorForm from '../../components/admin/AddDoctorForm';
import DoctorList from '../../components/admin/DoctorList';
import AddSectionForm from '../../components/admin/AddSectionForm';

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState('add');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSectionForm, setShowSectionForm] = useState(false);

  const views = [
    { name: 'Add Doctors', id: 'add' },
    { name: 'List of All Doctors', id: 'list' },
  ];

  const handleNewDoctorClick = () => {
    setShowAddForm(true);
    setShowSectionForm(false);
    setActiveView('add');
  };

  const handleSectionClick = () => {
    setShowSectionForm(true);
    setShowAddForm(false);
    setActiveView('add');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex">
      {/* Decorative Line Element (Header) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-full md:w-[200px] bg-blue-700 shadow-lg">
          <nav className="flex flex-col space-y-4 p-4 h-full">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => {
                  setActiveView(view.id);
                  setShowAddForm(false);
                  setShowSectionForm(false);
                }}
                className={`px-4 py-2 rounded-lg text-center font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 ${
                  activeView === view.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-blue-100 text-blue-500 hover:bg-purple-600 hover:text-white'
                }`}
              >
                {view.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8">
          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-purple-600 mb-6 tracking-tight animate-fade-in-up">
              Admin Dashboard
            </h2>
            {activeView === 'add' ? (
              <>
                <div className="mb-6 flex space-x-4">
                  <button
                    onClick={handleNewDoctorClick}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-[0_4px_12px_rgba(59,130,246,0.1)] hover:shadow-[0_6px_20px_rgba(147,51,234,0.15)] hover:-translate-y-1 ${
                      showAddForm
                        ? 'bg-purple-600 text-white'
                        : 'bg-blue-500 text-white hover:bg-purple-600'
                    }`}
                  >
                    New Doctor
                  </button>
                  <button
                    onClick={handleSectionClick}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-[0_4px_12px_rgba(59,130,246,0.1)] hover:shadow-[0_6px_20px_rgba(147,51,234,0.15)] hover:-translate-y-1 ${
                      showSectionForm
                        ? 'bg-purple-600 text-white'
                        : 'bg-blue-500 text-white hover:bg-purple-600'
                    }`}
                  >
                    Add Section
                  </button>
                </div>
                {showAddForm && <AddDoctorForm />}
                {showSectionForm && <AddSectionForm />}
              </>
            ) : (
              <DoctorList />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

// import React, { useState } from 'react';
// import AddDoctorForm from '../../components/admin/AddDoctorForm';
// import DoctorList from '../../components/admin/DoctorList';

// const AdminDashboard = () => {
//   const [activeView, setActiveView] = useState('add');
//   const [showAddForm, setShowAddForm] = useState(false);

//   const views = [
//     { name: 'Add Doctors', id: 'add' },
//     { name: 'List of All Doctors', id: 'list' },
//   ];

//   const handleNewDoctorClick = () => {
//     setShowAddForm(true);
//     setActiveView('add');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex">
//       {/* Decorative Line Element (Header) */}
//       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>

//       <div className="flex-1 flex">
//         {/* Sidebar */}
//         <aside className="w-full md:w-[200px] bg-blue-700 shadow-lg">
//           <nav className="flex flex-col space-y-4 p-4 h-full">
//             {views.map((view) => (
//               <button
//                 key={view.id}
//                 onClick={() => {
//                   setActiveView(view.id);
//                   if (view.id === 'add') {
//                     setShowAddForm(false); // Reset form visibility when switching to Add Doctors view
//                   }
//                 }}
//                 className={`px-4 py-2 rounded-lg text-center font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 ${
//                   activeView === view.id
//                     ? 'bg-purple-600 text-white'
//                     : 'bg-blue-100 text-blue-500 hover:bg-purple-600 hover:text-white'
//                 }`}
//               >
//                 {view.name}
//               </button>
//             ))}
//           </nav>
//         </aside>

//         {/* Content */}
//         <div className="flex-1 p-6 md:p-8">
//           <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 animate-fade-in">
//             <h2 className="text-3xl md:text-4xl font-extrabold text-center text-purple-600 mb-6 tracking-tight animate-fade-in-up">
//               Admin Dashboard
//             </h2>
//             {activeView === 'add' ? (
//               <>
//                 {!showAddForm && (
//                   <div className="mb-6">
//                     <button
//                       onClick={handleNewDoctorClick}
//                       className="bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-all duration-300 shadow-[0_4px_12px_rgba(59,130,246,0.1)] hover:shadow-[0_6px_20px_rgba(147,51,234,0.15)] hover:-translate-y-1"
//                     >
//                       New Doctor
//                     </button>
//                   </div>
//                 )}
//                 {showAddForm ? <AddDoctorForm /> : <AddDoctorForm />}
//                  {/* {showAddForm && <AddDoctorForm />} */}
//               </>
//             ) : (
//               <DoctorList />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;