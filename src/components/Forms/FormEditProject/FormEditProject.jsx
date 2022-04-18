import React, { useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch } from 'react-redux';

export default function FormEditProject(props) {
    const dispatch = useDispatch();
    const submitForm = (e) => {
        e.preventDefault();
        alert('submit');
    }

    useEffect(() => {
        dispatch({type: 'SET_SUBMIT_EDIT_PROJECT', submitFunction: submitForm});
    }, [])
 
    const handleEditorChange = (content, editor) => {
        // setFieldValue('description', content);
    }
    return (
        <form className='container-fluid' onSubmit={submitForm}>
            <div className='row'>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project id</p>
                        <input disabled type="text" className='form-control' name='id' />
                    </div>
                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project name</p>
                        <input type="text" className='form-control' name='projectName' />
                    </div>
                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project category</p>
                        <input type="text" className='form-control' name='projectCategory' />
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Description</p>
                        <Editor
                            apiKey='dolk1pdfx8gwxm6j90etg8e6cp9b4pzlyhks47w4tsy1p22h'
                            name='descriptionEdit'
                            init={{
                                selector: 'textarea#myTextArea',
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}
