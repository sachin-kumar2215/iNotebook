import React ,{useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email:"" ,password:"",cpassword:""})
    const [showPassword, setShowPassword] = useState(false);
    let navigate =useNavigate()
    const handelsubmit = async (e)=>{
        e.preventDefault()
        const {name,email,password} = credentials;
        const response = await fetch("https://i-notebook-sigma.vercel.app/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name,email,password}),
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            // save the auth token and redirected 
            localStorage.setItem('token',json.authToken)
            navigate('/')
            props.showAlert("Account Created Successfully","success");
          }
          else{
            props.showAlert("Invalid Credentials","danger");
          }
    }
    const onChange= (e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
      };
    return (
        <div className='container '>
            <h2 className="text-center mt-3 my-3 text-success" >Create New Account to Continue to iNotebook</h2>
            <form onSubmit={handelsubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type={showPassword ? "text" : "password"} className="form-control" id="password" name='password' onChange={onChange}  minLength={5} required />
                <button className={`btn ${showPassword ? 'btn-secondary' : 'btn-primary'}`} type="button" onClick={handlePasswordToggle}>
                {showPassword ? "Hide" : "Show"} Password
                </button>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup