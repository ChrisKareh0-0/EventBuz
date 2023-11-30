// components/CKeditor.js
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

let CKEditor;
let ClassicEditor;

const CKeditor = ({ name, onChange, editorLoaded }) => {
    const editorRef = useRef();
    const [isClient, setIsClient] = useState(false); // state to check if it's in client

    useEffect(() => {
        // Importing modules only on the client side
        import('@ckeditor/ckeditor5-react').then(CKEditorModule => {
            CKEditor = CKEditorModule.CKEditor;
        });
    
        import('@ckeditor/ckeditor5-build-classic').then(ClassicEditorModule => {
            ClassicEditor = ClassicEditorModule.default;
    
            if (editorLoaded && !editorRef.current) {
                // Initialize the CKEditor here
                ClassicEditor.create(document.querySelector('#' + name))
                    .then(editor => {
                        editorRef.current = editor;
    
                        // Attach change listener to editor
                        editor.model.document.on('change:data', () => {
                            onChange(editor.getData());
                        });
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        });
        
        setIsClient(true); // Setting the client state to true
    
        return () => {
            if (editorRef.current) {
                editorRef.current.destroy()
                    .then(() => {
                        editorRef.current = null;
                    });
            }
        }
    }, [editorLoaded, name, onChange]);

    return (
        <div>
            <div className='ckeditor-container' id={name}></div>
        </div>
    );
};

CKeditor.propTypes = {
    name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  editorLoaded: PropTypes.bool.isRequired,
  style: PropTypes.object
};

export default CKeditor;
