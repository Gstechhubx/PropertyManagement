import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import axios from 'axios'
function Login() {

  axios.defaults.withCredentials = true;
  const navigate = useNavigate()
  const LoginButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 20px',
    border: '1px solid',
    lineHeight: 1.5,
    borderRadius: "20px",
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });
  const [cred, setCred] = useState({ email: "", password: "" })
  const [loggedIn, setLogin] = useState(false)
  useEffect(() => {
    axios.get("http://localhost:9000/auth/login").then((res) => { console.log(res); setLogin(true); navigate("/ownerdashboard") }).catch(() => { console.log("Not logged in"); navigate("/") })
  }, []);
  useEffect(() => {
    if (loggedIn) {
      navigate("/ownerdashboard");
    }
  }, [loggedIn]);
  const handleChange = (e) => {
    console.log(cred)
    setCred({ ...cred, [e.target.type]: e.target.value })
  }
  const handleLogin = function (e) {
    e.preventDefault()
    axios.post('http://localhost:9000/auth/login', {
      email: cred.email,
      password: cred.password
    })
      .then(res => {
        console.log(res, res.status)
        if (res.status == 200) {
          setLogin(true)
          if (res.data.role == "owner") {

            navigate('/ownerdashboard')
          }
          else {
            navigate('/tenantdashboard')
          }
        }
        else {
          console.log(res.data)
          alert("Invalid Credentials")
        }
      })
      .catch(err => console.log(err));
  }
  return (
    <div className=' h-[100vh] pt-[15%]'>
      <form className=' w-[70%] md:w-[50%] mx-auto bg-white opacity-75 border-gray-400 border-2 rounded-lg p-5 backdrop-blur-20px backdrop-saturate-200 flex-col flex space-y-7 place-items-center text-center '>
        <h1 className='text-4xl'>Log In</h1>
        <TextField className='w-[80%]' type='email' onChange={handleChange} label="Email" variant='outlined'></TextField>
        <TextField className='w-[80%]' type="password" onChange={handleChange} label="Password" variant='outlined'></TextField>
        <LoginButton variant='contained' type="submit" onClick={handleLogin}>Log In</LoginButton>
        <pre>
          New User? <a href="/register" className='underline hover:text-blue-600'>Create Account</a>
        </pre>
      </form>
    </div>

  )
}
export default Login