import { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import userSignUp from "../services/api";

const Signup = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({});
  const [rePassword, setRePassword] = useState();
  const toast = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name === "re-password") {
      setRePassword(value)
    }
    else {
      setUserDetails((prevUserDetails) => ({
        ...prevUserDetails,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(userDetails)
      if(rePassword === userDetails.hashed_password){
        const successSignup = await userSignUp(userDetails);
        if (successSignup) navigate("/login");
      }
      else
        toast.current.show({ severity: 'error', summary: 'Password Error', detail: 'The passwords does not match', life: 3000 });
    } 
    catch (error) {
      console.error("Sign up Failed failed:", error);
    }
  };

  return (
    <div className='p-d-flex p-jc-center p-ai-center p-h-100'>
      <Card className='login-card' title='Sign Up'>
        <form onSubmit={handleSubmit} className='p-d-flex p-flex-column'>
          <label htmlFor='username'>Username</label>
          <div className='credential-div'>
            <InputText className="username" id='username' name='username' type='text' onChange={handleInputChange} />
          </div>
          <label htmlFor='firstname'>First Name</label>
          <div className='credential-div'>
            <InputText className="username" id='firstname' name='firstname' type='text' onChange={handleInputChange} />
          </div>
          <label htmlFor='lastname'>Last Name</label>
          <div className='credential-div'>
            <InputText className="username" id='lastname' name='lastname' type='text' onChange={handleInputChange} />
          </div>
          <label htmlFor='password'>Password</label>
          <div className='credential-div'>
            <InputText className="password" id='password' name='hashed_password' type='password' onChange={handleInputChange} />
          </div>
          <label htmlFor='re-password'>Re-enter Password</label>
          <div className='credential-div'>
            <InputText className="password" id='re-password' name='re-password' type='password' onChange={handleInputChange} />
          </div>

          <Button type='submit' label='Sign Up' className='login-btn' />
          <a className="login-link" onClick={() => navigate("/login")}>Back to Login page</a>

        </form>
      </Card>
    </div>
  );
};

export default Signup;