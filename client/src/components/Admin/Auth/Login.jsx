import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom';
import axios from '../../../axios'
import './Signin.css'
import jwt_decode from 'jwt-decode';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

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
      const response = await axios.post('/login', {
        email,
        password,
      });
      const token = response.data.token;
      // Store the token in local storage
      localStorage.setItem('token', token);
      console.log(token)
      // Handle the response here (e.g., store authentication token, redirect, etc.)
      console.log('Login successful:', response.data);

      // Reset the form fields
      setEmail('');
      setPassword('');
      navigate('/adminHome')
    } catch (error) {
      // Handle authentication errors (e.g., display error message)
      setError('Authentication failed. Please check your credentials.');
    }
  };
  const handleGetUserId = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      // Decode the token to get user details
      const decodedToken = jwt_decode(token);
      console.log(decodedToken.userId)
    
    }
    console.log(token)
  

   
  }; 
  return (
    
    <>
   <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
      <button onClick={handleGetUserId}>Get User ID</button>
      
      {/* Display user ID if available */}
      {userId && <p>User ID: {userId}</p>}

   </>
  )
}

export default Login