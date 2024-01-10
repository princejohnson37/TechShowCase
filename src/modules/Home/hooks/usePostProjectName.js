import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../services/axiosInstance";

const postProjectName = (pName) => {
	const payload = {
		name: pName,
	};
	return axiosInstance.post("/projects", payload);
};

const usePostProjectName = () => {
	const mutation = useMutation({
		mutationFn: (pName) => postProjectName(pName),
	});
	return mutation;
};

export default usePostProjectName;
