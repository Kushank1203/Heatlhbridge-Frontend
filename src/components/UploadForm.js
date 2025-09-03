// import React, { useState } from "react";
// import axios from "axios";

// function UploadForm() {
//   const [files, setFiles] = useState([]);
//   const [result, setResult] = useState(null);

//   const handleFileChange = (e) => {
//     setFiles(Array.from(e.target.files));
//   };

//   const handleRemoveFile = (indexToRemove) => {
//     setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (files.length === 0) return;

//     const formData = new FormData();
//     for (let file of files) {
//       formData.append("files", file);
//     }

//     const response = await axios.post("http://localhost:8000/process-claim/", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     setResult(response.data);
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="file"
//           multiple
//           accept="image/*,.pdf,.docx"
//           onChange={handleFileChange}
//         />
//         <button type="submit" disabled={files.length === 0}>
//           Upload & Analyze
//         </button>
//       </form>

//       {files.length > 0 && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>📂 Files to be uploaded:</h3>
//           <ul>
//             {files.map((file, index) => (
//               <li key={index}>
//                 {file.name}{" "}
//                 <button onClick={() => handleRemoveFile(index)} style={{ color: "red", marginLeft: "10px" }}>
//                   ❌ Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {result && (
//         <div style={{ marginTop: "30px" }}>
//           <h3>📄 OCR Extracted Text:</h3>
//           <pre style={{ backgroundColor: "#f4f4f4", padding: "10px" }}>{result.ocr_text}</pre>

//           <h3>🧾 Structured Fields:</h3>
//           <ul style={{ backgroundColor: "#f9f9f9", padding: "10px", listStyle: "none" }}>
//             {Object.entries(result.structured_data).map(([key, value]) => (
//               <li key={key}>
//                 <strong>{key.replace(/_/g, " ").toUpperCase()}:</strong> {value}
//               </li>
//             ))}
//           </ul>

//           <h3>🧠 LLM Decision:</h3>
//           <pre style={{ backgroundColor: "#e6f7ff", padding: "10px" }}>
//             {JSON.stringify(result.decision, null, 2)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UploadForm;



// import React, { useState } from "react";

// function UploadForm() {
//   const [files, setFiles] = useState([]);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setFiles(e.target.files);
//   };

  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!files.length) return;
//     setLoading(true);
//     setResult(null);

//     const formData = new FormData();
//     for (let i = 0; i < files.length; i++) {
//       formData.append("files", files[i]);
//     }

//     try {
//       const res = await fetch("http://127.0.0.1:8000/process-claim/", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       setResult(data);
//     } catch (error) {
//       console.error("Error:", error);
//       setResult({ error: "Failed to process claim" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "800px", margin: "auto" }}>
//       <h2>Health Insurance Claim Automation</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="file" multiple onChange={handleFileChange} />
//         <br />
//         <button type="submit" disabled={loading} style={{ marginTop: "10px" }}>
//           {loading ? "Processing..." : "Submit Claim"}
//         </button>
//       </form>

//       {loading && <p>Processing claim... please wait.</p>}

//       {result && (
//         <div style={{ marginTop: "20px" }}>
//           {result.error && <p style={{ color: "red" }}>{result.error}</p>}

//           {/* OCR Text */}
//           {result.ocr_text && (
//             <>
//               <h3>📄 OCR Extracted Text</h3>
//               <pre
//                 style={{
//                   background: "#f4f4f4",
//                   padding: "10px",
//                   maxHeight: "200px",
//                   overflowY: "auto",
//                   whiteSpace: "pre-wrap",
//                 }}
//               >
//                 {result.ocr_text}
//               </pre>
//             </>
//           )}

//           {/* Structured Fields */}
//           {result.structured_data && (
//             <>
//               <h3>🗂 Structured Fields</h3>
//               <pre style={{ background: "#eef", padding: "10px" }}>
//                 {JSON.stringify(result.structured_data, null, 2)}
//               </pre>
//             </>
//           )}

//           {/* Policy Clauses */}
//           {result.policy_clauses_used && result.policy_clauses_used.length > 0 && (
//             <>
//               <h3>📚 Policy Clauses Used</h3>
//               <ul style={{ background: "#fffbe6", padding: "10px" }}>
//                 {result.policy_clauses_used.map((clause, idx) => (
//                   <li key={idx} style={{ marginBottom: "5px" }}>
//                     {clause}
//                   </li>
//                 ))}
//               </ul>
//             </>
//           )}

//           {/* Decision */}
//           {result.decision && (
//             <>
//               <h3>✅ Claim Decision</h3>
//               <pre style={{ background: "#e6ffe6", padding: "10px" }}>
//                 {(() => {
//                   try {
//                     return JSON.stringify(
//                       JSON.parse(result.decision),
//                       null,
//                       2
//                     );
//                   } catch {
//                     return result.decision;
//                   }
//                 })()}
//               </pre>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default UploadForm;



import React, { useState } from "react";

function UploadForm() {
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) return;
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("http://127.0.0.1:8000/process-claim/", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "Failed to process claim" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>Health Insurance Claim Automation</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleFileChange} />
        {files.length > 0 && (
          <ul>
            {files.map((file, idx) => (
              <li key={idx}>
                {file.name}{" "}
                <button type="button" onClick={() => removeFile(idx)}>
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit Claim"}
        </button>
      </form>

      {loading && <p>Processing claim... please wait.</p>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          {result.error && <p style={{ color: "red" }}>{result.error}</p>}

          {result.ocr_text && (
            <>
              <h3>📄 OCR Extracted Text</h3>
              <pre
                style={{
                  background: "#f4f4f4",
                  padding: "10px",
                  maxHeight: "200px",
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                }}
              >
                {result.ocr_text}
              </pre>
            </>
          )}

          {result.structured_data && (
            <>
              <h3>🗂 Structured Fields</h3>
              <pre style={{ background: "#eef", padding: "10px" }}>
                {JSON.stringify(result.structured_data, null, 2)}
              </pre>
            </>
          )}

          {result.policy_clauses_used && result.policy_clauses_used.length > 0 && (
            <>
              <h3>📚 Policy Clauses Used</h3>
              <ul style={{ background: "#fffbe6", padding: "10px" }}>
                {result.policy_clauses_used.map((clause, idx) => (
                  <li key={idx} style={{ marginBottom: "5px" }}>
                    {clause}
                  </li>
                ))}
              </ul>
            </>
          )}

          {result.decision && (
            <>
              <h3>✅ Claim Decision</h3>
              <pre style={{ background: "#e6ffe6", padding: "10px" }}>
                {(() => {
                  try {
                    return JSON.stringify(
                      JSON.parse(result.decision),
                      null,
                      2
                    );
                  } catch {
                    return result.decision;
                  }
                })()}
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default UploadForm;
