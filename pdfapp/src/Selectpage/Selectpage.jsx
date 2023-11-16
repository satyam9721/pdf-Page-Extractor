import React, { useState } from 'react';
import axios from 'axios';

const SelectPage = () => {
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const [filename, setFilename] = useState('');
  const [response, setResponse] = useState('');

  const handleExtract = () => {
    if (!filename || !startPage || !endPage) {
      alert('Please enter all required information.');
      return;
    }

    const endpoint = `http://localhost:4000/api/pdf/extract/${filename}/${startPage}/${endPage}`;

    axios.get(endpoint)
      .then(response => {
        setResponse(response.data);
      })
      .catch(error => {
        console.error(error);
        setResponse('Error extracting pages. Please try again.');
      });
  };


  const PDF_FILE_URL="http://localhost:4000/api/file/Ishihara_Tests.pdf_extracted.pdf"  
  
//   const downloadFileAtURL=(url)=>{
//     fetch(url).then(Response=>Response.blob()).then(blob=>{
//         const blobURL=window.URL.createObjectURL(new Blob([blob]))
//         const fileName=url.split("/").pop();
//         const aTag=document.createElement("a");
//         aTag.href=blobURL
//         aTag.setAttribute("download",fileName)
//         document.body.appendChild(aTag)
//         aTag.click()
//         aTag.remove()
//     })
   
// }

  return (
    <div>
      <h2>Select PDF Pages</h2>
      <label>
        File Name:
        <input type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />
      </label>
      <br />
      <label>
        Start Page:
        <input type="text" value={startPage} onChange={(e) => setStartPage(e.target.value)} />
      </label>
      <br />
      <label>
        End Page:
        <input type="text" value={endPage} onChange={(e) => setEndPage(e.target.value)} />
      </label>
      <br />
      <button onClick={handleExtract}>Extract PDF</button>
      <br />
      <div>
        <h3>API Response:</h3>
        {response.message && <p>{response.message}</p>}
        {response.filePath && <p></p>}
        {typeof response === 'string' && <pre>{response}</pre>}
      </div>
      {/* <button onClick={()=>{downloadFileAtURL(PDF_FILE_URL)}}>Download Pdf</button> */}
    </div>
  );
};

export default SelectPage;
