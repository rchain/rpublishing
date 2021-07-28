import React, { useState } from "react";
import "./index.css";

const UploadDocument = () => {
  const [title, setTitle] = useState("");
  const [copies, setCopies] = useState("");
  const [price, setPrice] = useState("");
  const [documentFile, setDocumentFile] = useState("");
  const [attester, setAttester] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    const documentObject = {
      title,
      copies,
      price,
      attester,
      documentFile,
    };
    localStorage.setItem("document", JSON.stringify(documentObject));
    console.log(documentObject);

    alert("Document sent to the attester!");
  };

  return (
    <>
      <section className="practice">
        <aside></aside>
        <section>
          <main className="prac-main">
            <section className="container-fluid prac-main-container">
              <form className="upload-form">
                <div>
                  <h4 className="header-title">Upload Document</h4>
                </div>
                <p className="upload-form-title">
                  <b>Enter upload details below</b>
                </p>
                <div className="upload-row">
                  <div className="upload-column">
                    <label for="title">Title</label>
                    <input
                      type="text"
                      className="uploadform-inputs"
                      name="title"
                      placeholder="Enter the name of the photograph"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label for="year">Copies</label>
                    <input
                      type="number"
                      className="uploadform-inputs"
                      name="copies"
                      placeholder="How many do you want to mint?"
                      onChange={(e) => setCopies(e.target.value)}
                    />
                    <label for="cast">Price</label>
                    <input
                      type="number"
                      className="uploadform-inputs"
                      name="price"
                      placeholder="What price do you want to charge?"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <label for="category">Choose Attester</label>
                    <select
                      id="selectCategory"
                      name="category"
                      onChange={(e) => setAttester(e.target.value)}
                    >
                      <option name="attester">Attester</option>
                      <option name="attester">Magnum Photos</option>
                    </select>
                  </div>
                  <div className="upload-column">
                    <label className="customUpload">
                      Choose Cover Image<br></br>
                      <br></br>
                      <input
                        type="file"
                        name="document"
                        className="file-upload"
                        placeholder="Choose Cover Image"
                        onChange={(e) => setDocumentFile(e.target.files[0])}
                      />
                    </label>
                  </div>
                </div>
                <div className="Uploadbtn-container">
                  <button className="uploadbtn" onClick={handleUpload}>
                    Upload
                  </button>
                </div>
              </form>
            </section>
          </main>
        </section>
      </section>
    </>
  );
};

export default UploadDocument;
