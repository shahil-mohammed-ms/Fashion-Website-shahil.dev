
import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom';
import axios from '../../../axios'
import './Signin.css'


function Signin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      const response = await axios.post('/signup', {
        name,
        email,
        password,
      });
    navigate('/Adminlogin')
    } catch (error) {
      // Handle authentication errors (e.g., display error message)
      setError('Authentication failed. Please check your credentials.');
    }
  };

  return (
    <>
    <h2>Login</h2>
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
     
       
 
    </>
  )
}

export default Signin