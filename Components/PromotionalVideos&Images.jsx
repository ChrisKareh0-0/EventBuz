import {useState, useRef, useEffect} from 'react'
import styles from '../styles/DragDropUpload.module.css'
import { Store } from '@/Redux/store'
import { setSponsorPicture } from '@/Redux/slice'

export default function PromotionalVideosAndImages({ fileData, onFileChange }) {
    const [isDragActive, setIsDragActive] = useState(false)
    const [filePreview, setFilePreview] = useState(fileData.preview); // Initialize with passed preview

    const fileInputRef = useRef(null)

    useEffect(() => {
        if(fileData && fileData.url){
            setFilePreview(fileData.url)
        }
    }, [fileData]);

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragActive(true);
    }

    const handleDragLeave = () => {
        setIsDragActive(false)
    }

    const handleDrop = (event) => {
       event.preventDefault();

       if(event.dataTransfer.items && event.dataTransfer.items.length > 0){
            const file = event.dataTransfer.items[0].getAsFile();
            processFile(file)
            console.log('File:', file);
            Store.dispatch(setSponsorPicture(file))
           
       }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFilePreview(reader.result); // Update local state for preview
            onFileChange(file, reader.result); // Update parent component
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
         <div className={`${styles.dropzone} ${isDragActive ? styles.active : ' '}`}
            style={{cursor:'pointer'}}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()} // Trigger hidden file input click on dropzone click
        >
            {fileData.preview || filePreview ? (
                <img src={filePreview ||fileData.preview} alt="Uploaded Preview" className={styles.previewImage} />
            ) : (
                <p style={{marginTop: 50, marginLeft: 70}}>Drag & drop a file or click to select one</p>
            )}
            <input 
                ref={fileInputRef} 
                type="file" 
                style={{ display: 'none', cursor:'pointer' }} 
                onChange={handleFileChange} 
            />
        </div>

       
  </>
    ) 
}