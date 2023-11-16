import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import './home.css';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const [filename, setFilename] = useState('');
  const [response, setResponse] = useState('');
  const [selectedPages, setSelectedPages] = useState([]);
  



  const handleExtract = (e) => {
    
    const endpoint = `http://localhost:4000/api/pdf/extract/${fileName}.pdf/${startPage}/${endPage}`;
   
    axios
      .get(endpoint)
      .then((response) => {
        setResponse(response.data);
        
      })
      .catch((error) => {
        alert('Please Choose Page Numbers');
        // setResponse('Please select pagess again.');
      });
  };

  const handlePageSelection = (pageNumber) => {
    const updatedSelection = selectedPages.includes(pageNumber)
      ? selectedPages.filter((page) => page !== pageNumber)
      : [...selectedPages, pageNumber];

    setSelectedPages(updatedSelection);
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setFileName(file.name.split('.')[0]); // Extracting file name without extension
      setIsFileUploaded(true);
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  const onFileUpload = () => {
    if (!selectedFile) {
      alert('Please select a PDF file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios
      .post('http://localhost:4000/api/upload ', formData)
      .then((response) => {
        console.log(response.data);
        alert('File uploaded successfully!');
      })
      .catch((error) => {
        console.error(error);
        alert('Error uploading file. Please try again.');
      });
  };

  const handleDownloadPdf = () => {
    if (isFileUploaded) {
      const pdfFileUrl = `http://localhost:4000/api/file/${fileName}.pdf_extracted.pdf`;
      downloadFileAtURL(pdfFileUrl);
    } else {
      alert('Please upload a PDF file first.');
    }
  };

  const downloadFileAtURL = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(new Blob([blob]));
        const fileName = url.split('/').pop();
        const aTag = document.createElement('a');
        aTag.href = blobURL;
        aTag.setAttribute('download', fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      })
      .catch((error) => {
        console.error(error);
        alert('Error downloading file. Please try again.');
      });
  };

  return (
    <div className="container">
     

      <form onSubmit={(e) => { e.preventDefault(); onFileUpload();  handleExtract(); }}>
        <label>
          <input type="file" onChange={onFileChange} accept=".pdf" />
          Choose PDF
        </label>
        <button type="submit">Upload</button>
      </form>

      <h2>View PDF</h2>
      <div className="viewer-container">
        <div>
          <h3>Visual Representation of Selected PDF</h3>
          {selectedFile && (
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}>
              <Viewer
                fileUrl={URL.createObjectURL(selectedFile)}
                plugins={[
                  defaultLayoutPlugin,
                  {
                    renderPageLayer: (props) => {
                      const { pageIndex } = props;
                      const pageNumber = pageIndex + 1;
                      const isSelected = selectedPages.includes(pageNumber);

                      return (
                        <div
                          key={pageNumber}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                          }}
                        >
                          {/* <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handlePageSelection(pageNumber)}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              cursor: 'pointer',
                              zIndex: 1, // Ensure the checkbox is on top
                              opacity: 0, // Make the actual checkbox invisible
                            }}
                          /> */}
                          <span
                            style={{
                              position: 'absolute',
                              top: '10%',
                              left: '9%',
                              
                              transform: 'translate(-50%, -50%)',
                              color: 'black',
                              fontWeight: 'bold',
                              fontSize: '16px',
                              zIndex: 2, // Ensure the text is on top
                            }}
                          >
                            {pageNumber}
                          </span>
                        </div>
                      );
                    },
                  },
                ]}
              />
            </Worker>
          )}
        </div>
      </div>

      <div className="pdf-action-container">
        <p>Select Starting and Ending Page</p>
        <label>
          Enter Start Page:
          <input type="text" value={startPage} onChange={(e) => setStartPage(e.target.value)} />
        </label>
        <label>
        Enter End Page:
          <input type="text" value={endPage} onChange={(e) => setEndPage(e.target.value)} />
        </label>
        <button className="Extract-btn" onClick={handleExtract}>Create New Pdf</button>

        <div className="response-container">
          {/* <h3>API Response:</h3> */}
          {response.message && <p>{response.message}</p>}
          {response.filePath && <p></p>}
          {typeof response === 'string' && <pre>{response}</pre>}
        </div>

        <button className="download-btn" onClick={handleDownloadPdf}>
          Download Pdf Link
        </button>
      </div>
    </div>
  );
};

export default Home;
