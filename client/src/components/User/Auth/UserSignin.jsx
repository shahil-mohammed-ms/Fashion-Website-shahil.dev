import React,{useState} from 'react'
import axios from '../../../axios'
import './index.css'

function UserSignin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your server endpoint with the user's credentials
      const response = await axios.post('/UserSignup', {
        name,
        email,
        password,
      });
    
    } catch (error) {
      // Handle authentication errors (e.g., display error message)
      setError('Authentication failed. Please check your credentials.');
    }
  };
  return (
    <div><h2>SignUp</h2>
    <form onSubmit={handleSubmit}>
    <div>
        <label>Name:</label>
        <input
          type="name"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
  )
}

export default UserSignin