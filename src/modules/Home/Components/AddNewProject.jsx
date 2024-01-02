import { useRef } from "react";
import useUploadFile from '../hooks/useUploadFile';

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
        onSuccess: (response) => console.log('File uploaded successfully', response.data),
        onError: (error) => console.error('Error uploading file:', error),
      });
    }
  };

  return (
    <>
      <div
        key="new"
        className="homepage-card"
        onClick={onAddNewClick}
        onKeyDown={onAddNewClick}
      >
        +
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      {isLoading && <p>Uploading...</p>}
      {isError && <p>Error in file upload</p>}
    </>
  );
};

export default AddNewProject;