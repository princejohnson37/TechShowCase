import axios from "axios";
import { AUTH_POST } from "../../../services/endpoints";

const userLogin = async (authData) => {
  try {
    const response = await axios.post(
      'http://localhost:8000'+AUTH_POST.login,
      authData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    console.log(response.data);
	localStorage.setItem('token', response.data)
  } catch (error) {
    console.error(error);
  }
};

export default userLogin;
