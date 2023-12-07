// client/src/components/DocumentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backendUrlPrefix from '../../utils/backendUrlPrefix';

const DocumentList = (props) => {
  const [documents, setDocuments] = useState([]);
  const [householdID, setHouseholdID] = useState(props.householdID);

  const backendApiUrl = `${backendUrlPrefix}/uploads/${householdID}/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(backendApiUrl);
        setDocuments(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching documents from the backend:', error);
      }
    };

    fetchData();
  }, [backendApiUrl]);

  const handleDownload = (fileName, filePath) => {
    const downloadUrl = `${backendUrlPrefix}/uploads/${householdID}/${fileName}`;

    // Create a link element
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = '_blank';
    link.download = fileName;

    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <ul>
        {documents.map((document) => (
          <li key={document._id}>
            {document.fileName}{' '}
            <button onClick={() => handleDownload(document.fileName, document.filePath)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
