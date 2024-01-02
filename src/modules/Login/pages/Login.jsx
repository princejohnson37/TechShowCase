import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './Login.css'
import userLogin from '../services/auth';

const Login = () => {
  const [userDetails, setUserDetails] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Details:', userDetails);
	userLogin(userDetails);
  };

  return (
    <div className="p-d-flex p-jc-center p-ai-center p-h-100">
      <Card className="login-card" title="Login">
        <form onSubmit={handleSubmit} className="p-d-flex p-flex-column">
          <label htmlFor="username">Username</label>
          <div className="p-field">
            <InputText
              id="username"
              name="username"
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <label htmlFor="password">Password</label>
          <div className="p-field">
            <InputText
              id="password"
              name="password"
              type="password"
              onChange={handleInputChange}
            />
          </div>

          <Button type="submit" label="Login" className="p-mt-2" />
        </form>
      </Card>
    </div>
  );
};

export default Login;
