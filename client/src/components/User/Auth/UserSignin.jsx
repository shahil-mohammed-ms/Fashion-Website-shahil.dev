import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom';
import axios from '../../../axios'
import './index.css'

function UserSignin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameError('');
    setEmailError('');
    setPasswordError('');


    if (name === '') {
      setNameError('Please enter your email');
      return;
    }
    if (email === '') {
      setEmailError('Please enter your email');
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if (password === '') {
      setPasswordError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }

    try {
      // Make a POST request to your server endpoint with the user's credentials
      const response = await axios.post('/UserSignup', {
        name,
        email,
        password,
      });
      navigate('/Userlogin')
    
    } catch (error) {
      // Handle authentication errors (e.g., display error message)
      setError('Authentication failed. Please check your credentials.');
    }
  };
  return (
    <div className="mainContainer">
    <div className="titleContainer">
      <h2>Sign in</h2>
    </div>
    <br />
    <div className="inputContainer">
      <input
        value={name}
        placeholder="Enter your name here"
        onChange={(e) => setName(e.target.value)}
        className="inputBox"
        type="name"
      />
      <label className="errorLabel">{nameError}</label>
    </div>
    <br />
    <div className="inputContainer">
      <input
        value={email}
        placeholder="Enter your email here"
        onChange={(e) => setEmail(e.target.value)}
        className="inputBox"
        type="email"
      />
      <label className="errorLabel">{emailError}</label>
    </div>
    <br />
    <div className="inputContainer">
      <input
        value={password}
        placeholder="Enter your password here"
        onChange={(e) => setPassword(e.target.value)}
        className="inputBox"
        type="password"
      />
      <label className="errorLabel">{passwordError}</label>
    </div>
    <br />
    <div className="inputContainer">
      <input
        className="inputButton"
        type="button"
         onClick={handleSubmit}
        value="Sign in"
      />
    </div>
  </div>
  //   <div><h2>SignUp</h2>
  //   <form onSubmit={handleSubmit}>
  //   <div>
  //       <label>Name:</label>
  //       <input
  //         type="name"
  //         placeholder="Enter your name"
  //         value={name}
  //         onChange={handleNameChange}
  //       />
  //     </div>
  //     <div>
  //       <label>Email:</label>
  //       <input
  //         type="email"
  //         placeholder="Enter your email"
  //         value={email}
  //         onChange={handleEmailChange}
  //       />
  //     </div>
  //     <div>
  //       <label>Password:</label>
  //       <input
  //         type="password"
  //         placeholder="Enter your password"
  //         value={password}
  //         onChange={handlePasswordChange}
  //       />
  //     </div>
  //     <button type="submit">Login</button>
  //   </form>
  // </div>
  )
}

export default UserSignin