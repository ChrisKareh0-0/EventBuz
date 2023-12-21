import React, { useState } from 'react';

const FileUploadComponent = ({ onFileUpload }) => {

    const [previewUrl, setPreviewUrl] = useState(null);

    const onFileChange = (event) => {
        if(event.target.files && event.target.files[0]) {
            

            const fileReader = new FileReader();
            const file = event.target.files[0];
            
            fileReader.onloadend = () => {
                setPreviewUrl(fileReader.result); // Set the preview URL to the result of FileReader
            };

            fileReader.readAsDataURL(file); // Read the file as a data URL for preview
            onFileUpload(file);
        }
    }

    return (
        <>
            <form style={{paddingTop: 100}}className="file-upload-form">
            <label htmlFor="file" className={`file-upload-label ${previewUrl ? 'image-present' : ''}`}>
            {previewUrl ? (
                <>
                        <input id="file" type="file" onChange={onFileChange} />
                        <img src={previewUrl} alt="Preview" className="image-preview"/>
                        
                        </>
                    ) : (
                <>
                    <div className="file-upload-design">
                        <svg viewBox="0 0 640 512" height="1em">
                            <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                        </svg>
                        <p>Drag and Drop</p>
                        <p>or</p>
                        <span className="browse-button">Browse file</span>
                    </div>
                    
                    <input id="file" type="file" onChange={onFileChange}/>
                </>
                
                )}
                {!previewUrl && <input id="file" type="file" onChange={onFileChange} style={{ display: 'none' }} />}
                </label>
            </form>

            <style jsx>{`
                .file-upload-form {
                    width: fit-content;
                    height: fit-content;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #1B1C1F;
                    
                }
                .file-upload-label input {
                    display: none;
                }
                .file-upload-label svg {
                    height: 50px;
                    fill: rgb(82, 82, 82);
                    margin-bottom: 20px;
                }
                .file-upload-label {
                    cursor: pointer;
                    background-color: #232323;
                    border-radius: 40px;
                    border: 2px dashed rgb(82, 82, 82);
                    box-shadow: 0px 0px 200px -50px rgba(0, 0, 0, 0.719);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    width: 300px; /* Adjust width as needed */
                    height: 200px; /* Adjust height as needed */
                    overflow: hidden;
                }
                .file-upload-label:not(.image-present) {
                    padding: 30px; /* Apply padding only when image is not present */
                }
                .image-preview {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .file-upload-design {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                }
                .file-upload-design, .browse-button {
                    display: none;
                }
                .file-upload-label.image-present .file-upload-design, 
                .file-upload-label.image-present .browse-button {
                    display: block;
                }
                .browse-button {
                    background-color: rgb(82, 82, 82);
                    padding: 5px 15px;
                    border-radius: 10px;
                    color: white;
                    transition: all 0.3s;
                }
                .browse-button:hover {
                    background-color: rgb(14, 14, 14);
                }
            `}</style>
        </>
    );
}

export default FileUploadComponent;