import React,{useState} from "react";
import {useNavigate } from 'react-router-dom'
const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"" , password:""})
    let navigate =useNavigate()
    const handelsubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch("https://i-notebook-sigma.vercel.app/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password}),
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            // save the auth token and redirected 
            localStorage.setItem('token',json.authToken)
            props.showAlert("Logged in Successfully","success");
            navigate('/')
          }else{
            props.showAlert("Invalid Details","danger");
          }
    }
    const onChange= (e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
  return (
    <div className="container">
      <h2 className="text-center mt-3 my-3 text-success" >Login to Continue to iNotebook</h2>
      <form onSubmit={handelsubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label" >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
