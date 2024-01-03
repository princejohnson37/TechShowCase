import { useRef } from "react";
import useUploadFile from "../hooks/useUploadFile";
import "primeicons/primeicons.css";

const AddNewProject = () => {
	const fileInputRef = useRef(null);
	const { mutate: upload, isLoading, isError } = useUploadFile();

	const onAddNewClick = () => {
		fileInputRef.current.click();
	};

	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			upload(file, {
				onSuccess: (response) => console.log("File uploaded successfully", response.data),
				onError: (error) => console.error("Error uploading file:", error),
			});
		}
	};

	return (
		<>
			<button
				key='new'
				className='homepage-card'
				style={{
					color: "#ccc",
					backgroundColor:"#6f6f6f"
				}}
				onClick={onAddNewClick}
				onKeyDown={onAddNewClick}
			>
				Upload File
				<br />
				<br />
				<i className='pi pi-plus'></i>
			</button>
			<input
				type='file'
				ref={fileInputRef}
				onChange={handleFileUpload}
				style={{ display: "none" }}
			/>
			{isLoading && <p>Uploading...</p>}
			{isError && <p>Error in file upload</p>}
		</>
	);
};

export default AddNewProject;
