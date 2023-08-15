import React, { useState } from 'react';
import './RegistrationForm.css'; // Import the CSS file for styling
import axios from 'axios';
import Swal from 'sweetalert2';
import dingSound from './ding.mp3';


const RegistrationForm = () => {
  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState(''); // Declare registrationMessage state
  const [playSuccessSound, setPlaySuccessSound] = useState(false);

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleCaptainNameChange = (e) => {
    setCaptainName(e.target.value);
  };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      teamName,
      captainName,
      contactNumber,
      email,
    };

    try {

      const confirmationResult = await Swal.fire({
        title: 'Confirm Register',
        text: 'Are you sure you want to Register this user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Register',
        cancelButtonText: 'Cancel',
        dangerMode: true,
      });

      if (confirmationResult.isConfirmed) {
        const response = await axios.post('http://localhost:8082/register', formData);
      console.log('Response from backend:', response.data);
      const code=response.data.statusCode;
        if (code === '20000') {
          const audio = new Audio(dingSound);
          audio.play();
       
          Swal.fire({
            title: 'Done',
            text: response.data.message,
            icon: 'success',
          });
          setTeamName('');
        setCaptainName('');
        setContactNumber('');
        setEmail('');
        }else {
          Swal.fire({
            title: 'Warning',
            text: response.data.message,
            icon: 'warning',
          });
        }
       
      }
      //setRegistrationMessage(response.data); // Set registrationMessage here
    } catch (error) {
      console.error('Error sending registration data:', error);
      setRegistrationMessage('An error occurred during registration.');
    }
  };

  return (
    <div className="registration-form">
      <h2>Cricket Team Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="teamName">Team Name:</label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={handleTeamNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="captainName">Captain Name:</label>
          <input
            type="text"
            id="captainName"
            value={captainName}
            onChange={handleCaptainNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="tel"
            id="contactNumber"
            value={contactNumber}
            onChange={handleContactNumberChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button className='button' type="submit">Register</button>
      </form>
      {registrationMessage && <p>{registrationMessage}</p>}
      
    </div>
  );
};

export default RegistrationForm;



