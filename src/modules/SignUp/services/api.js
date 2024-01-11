import axios from "axios";
import { WEBSERVER_URL } from "../../../utils/constants";
const userSignUp = async (authData) => {
	try {
		const response = await axios.post(WEBSERVER_URL + "/user", authData, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export default userSignUp;
