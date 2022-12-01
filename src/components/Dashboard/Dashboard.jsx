import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.scss';

const Dashboard = () => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = () => {
    axios.post('http://localhost:5001/users', { username: registerUsername, password: registerPassword })
      .then((res) => {
        console.log(res);
      });
  };


  return (
    <div className='user-login'>
      <div className='form'>
        <div style={{ textAlign: 'center', color: 'Green', fontWeight: "bold", fontSize: '25px' }}>
          New User
        </div>
        <br />
        <div className='label-input'>
          <label>Username:</label>
          <input onChange={e => { setRegisterUsername(e.target.value); }} type="text" placeholder="Username" />
        </div>
        <div className='label-input'>
          <label>Password:</label>
          <input onChange={e => { setRegisterPassword(e.target.value); }} type="password" placeholder="Password" />
        </div>
        <div className='form-button'>
          <button onClick={register} className='register'>Register</button>
        </div>
      </div>
      <div className='form'>
        <div style={{ textAlign: 'center', color: 'rgb(94, 94, 255)', fontWeight: "bold", fontSize: '25px' }}>
          Returning User
        </div>
        <br />
        <div className='label-input'>
          <label>Username:</label>
          <input type="text" placeholder="Username" />
        </div>
        <div className='label-input'>
          <label>Password:</label>
          <input type="password" placeholder="Password" />
        </div>
        <div className='form-button'>
          <button className='login'>Log in</button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;

// onChange={setNewUser(e => (prev => ({...prev, name: e.target.value})))} 