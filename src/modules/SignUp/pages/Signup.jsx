import { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import userSignUp from "../services/api";
import { Toast } from 'primereact/toast';

const Signup = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({});
  const [rePassword, setRePassword] = useState();
  const toast = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "re-password") {
      setRePassword(value);
    } else {
      setUserDetails((prevUserDetails) => ({
        ...prevUserDetails,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(userDetails);
      if (rePassword === userDetails.hashed_password) {
        const successSignup = await userSignUp(userDetails);
        if (successSignup) navigate("/login");
      } else
        toast.current.show({
          severity: "error",
          summary: "Password Error",
          detail: "The passwords do not match",
          life: 3000,
        });
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  return (
    <div className='login-container p-d-flex p-jc-center p-ai-center p-h-100'>
    <div className="p-d-flex p-jc-center p-ai-center p-h-100">
      <Toast ref={toast} />
      <Card className="login-card" title="Sign Up">
        <form onSubmit={handleSubmit} className="p-d-flex p-flex-column">
          <div className="form-row">
            <div className="credential-div">
              <label htmlFor="username">Username</label>
              <InputText
                className="username"
                id="username"
                name="username"
                type="text"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="credential-div">
              <label htmlFor="firstname">First Name</label>
              <InputText
                className="username"
                id="firstname"
                name="firstname"
                type="text"
                onChange={handleInputChange}
              />
            </div>
            <div className="credential-div">
              <label htmlFor="lastname">Last Name</label>
              <InputText
                className="username"
                id="lastname"
                name="lastname"
                type="text"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="credential-div">
              <label htmlFor="password">Password</label>
              <InputText
                className="password"
                id="password"
                name="hashed_password"
                type="password"
                onChange={handleInputChange}
              />
            </div>
            <div className="credential-div">
              <label htmlFor="re-password">Re-enter Password</label>
              <InputText
                className="password"
                id="re-password"
                name="re-password"
                type="password"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div style={{alignItems:"center"}} className="btn-div">
            <Button type="submit" label="Sign Up" className="signup-btn" />
          </div>
          <a className="login-link" onClick={() => navigate("/login")}>
            Back to Login page
          </a>
        </form>
      </Card>
    </div>
    </div>
  );
};

export default Signup;