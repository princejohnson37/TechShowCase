import axios from "axios";

const userSignUp = async (authData) => {
	try {
		const response = await axios.post("http://localhost:8000" + "/user", authData, {
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
