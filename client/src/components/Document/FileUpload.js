// client/src/components/FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import backendUrlPrefix from '../../utils/backendUrlPrefix';

const FileUpload = (props) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(''); // Add state for file name
  const [householdID, setHouseholdID] = useState(props.householdID);

  const backendApiUrl = `${backendUrlPrefix}/uploads/${householdID}`;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleUpload = async () => {
    if (!file || !fileName) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName); // Append the file name
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log(formDataObject)

    try {
      await axios.post(backendApiUrl, formData);
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder="Enter file name" value={fileName} onChange={handleFileNameChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
