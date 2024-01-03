import axios from "axios";
import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../services/queryClient";
import { axiosInstance } from "../../../services/axiosInstance";

const useUploadFile = () => {
	const uploadFile = async (file) => {
		const formData = new FormData();
		formData.append("file", file);

		return axiosInstance.post("/files", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	};
	const mutation = useMutation({
		mutationFn: uploadFile,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["files"] }),
	});
	return mutation;
};

useUploadFile.propTypes = {
	file: PropTypes.instanceOf(File),
};

export default useUploadFile;
