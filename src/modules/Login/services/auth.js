import axios from "axios";
import { AUTH_POST } from "../../../services/endpoints";
import { WEBSERVER_URL } from "../../../utils/constants";

const userLogin = async (authData) => {
	try {
		const response = await axios.post(WEBSERVER_URL + AUTH_POST.login, authData, {
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
