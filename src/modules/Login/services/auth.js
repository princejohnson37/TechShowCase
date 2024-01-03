import axios from "axios";
import { AUTH_POST } from "../../../services/endpoints";

const userLogin = async (authData) => {
	try {
		const response = await axios.post("http://3.133.143.99:8000" + AUTH_POST.login, authData, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		localStorage.setItem("token", JSON.stringify(response.data));
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export default userLogin;
