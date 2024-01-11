import { useRef, useState } from "react";
import useUploadFile from "../hooks/useUploadFile";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import usePostProjectName from "../hooks/usePostProjectName";

const AddNewProject = () => {
	const [file, setFile] = useState(null);
	const fileInputRef = useRef(null);
	const { mutate: upload, isLoading, isError } = useUploadFile();
	const { mutate: postProjectName } = usePostProjectName();

	const [viewModal, setViewModal] = useState(false);
	const modalHandler = () => {
		setViewModal((prev) => !prev);
	};
	const [projectName, setProjectName] = useState("");

	const createProjectHandler = async () => {
		postProjectName(projectName, {
			onSuccess: (data) => {
				const projectUUID = data?.data?.id;
				upload({ file, projectUUID });
				modalHandler();
				onUpload();
			},
		});
	};

	const footerContent = (
		<div>
			<Button label='Create Project' icon='pi pi-check' onClick={createProjectHandler} autoFocus />
			<Button
				label='Cancel'
				icon='pi pi-times'
				onClick={() => setViewModal(false)}
				className='p-button-text'
			/>
		</div>
	);

	const toast = useRef(null);

	const onUpload = () => {
		toast.current.show({ severity: "success", summary: "Success", detail: "File Uploaded" });
	};
	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		setFile(file);
	};

	return (
		<div>
			<button
				key='new'
				className='homepage-card'
				style={{
					color: "#ccc",
					backgroundColor: "#6f6f6f",
				}}
				onClick={modalHandler}
			>
				Create Project
				<br />
				<br />
				<i className='pi pi-plus'></i>
			</button>
			<Toast ref={toast}></Toast>
			<Dialog
				header='Add New Project'
				visible={viewModal}
				style={{ width: "50vw" }}
				onHide={() => setViewModal(false)}
				footer={footerContent}
			>
				<div className='card flex justify-content-center '>
					<div>Project Name</div>
					<InputText value={projectName} onChange={(e) => setProjectName(e.target.value)} />
				</div>
				<div>
					<div className='card flex justify-content-center'>
						<input type='file' ref={fileInputRef} onChange={handleFileUpload} />
					</div>
					{isLoading && <div>Uploading</div>}
				</div>
			</Dialog>
		</div>
	);
};

export default AddNewProject;
