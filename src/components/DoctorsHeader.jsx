import banner from '../assets/doc.png';
 
const DoctorsHeader = () => {
 
  return (
    <div className="w-full min-h-[40vh] mx-auto bg-b3d8e4-gradient flex flex-col md:flex-row items-center justify-between">
      {/* Right Content */}
      <div className="md:w-3/4 mb-6 md:mb-0 text-left md:text-center md:pl-32 md:pr-8">
        <h1 className="text-4xl font-bold text-custom-blue mb-4 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">Meet Our Expert Doctors</h1>
        <h1 className="text-4xl font-bold text-custom-blue mb-4 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">Specialized Care, Just a Click Away</h1>
        <p className="text-custom-blue font-bold text-m mb-4">
          Connect with top-tier medical professionals for personalized consultations, both online and in-clinic.
        </p>
        <p className="text-custom-blue font-bold text-m mb-4">
          Your health, our priority – find the right doctor at OneStep Medi.
        </p>
      </div>
 
      {/* Right Image */}
    <div className="md:w-[50%] flex justify-center">
          <img src={banner} alt="Healthcare" className="max-w-full h-auto max-h-[50vh]" />
        </div>
    </div>
  );
};
 
export default DoctorsHeader;