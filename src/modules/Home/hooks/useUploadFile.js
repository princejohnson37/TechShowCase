import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../services/queryClient";
import { axiosInstance } from "../../../services/axiosInstance";

const useUploadFile = () => {
	const uploadFile = async (payload) => {
		const { file, projectUUID } = payload;
		const formData = new FormData();
		formData.append("file", file);
		console.log(projectUUID);

		return axiosInstance.post(`/projects/${projectUUID}/files`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	};
	const mutation = useMutation({
		mutationFn: uploadFile,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
	});
	return mutation;
};

// useUploadFile.propTypes = {
// 	file: PropTypes.instanceOf(File),
// };

export default useUploadFile;
