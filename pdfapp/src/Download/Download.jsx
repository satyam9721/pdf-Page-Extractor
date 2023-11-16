import React, { useState } from 'react';

function Download() {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileName = files[0].name;
    setFileName(fileName);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <p>File name: {fileName}</p>
    </div>
  );
};






export default Download;

























// import React from 'react'
// const PDF_FILE_URL="http://localhost:4000/api/file/Ishihara_Tests.pdf_extracted.pdf"

// function Download() {
//     const downloadFileAtURL=(url)=>{
//         fetch(url).then(Response=>Response.blob()).then(blob=>{
//             const blobURL=window.URL.createObjectURL(new Blob([blob]))
//             const fileName=url.split("/").pop();
//             const aTag=document.createElement("a");
//             aTag.href=blobURL
//             aTag.setAttribute("download",fileName)
//             document.body.appendChild(aTag)
//             aTag.click()
//             aTag.remove()
//         })
       
//     }
//   return (
//     <div>
//         <h1>Download window</h1>
        
//         <button onClick={()=>{downloadFileAtURL(PDF_FILE_URL)}}>Download Pdf</button>
//     </div>
//   )
// }

// export default Download