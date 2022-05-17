import React, { useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect, useSelector, useDispatch } from 'react-redux';
import { GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../redux/constants/Jira/ProjectCategoryConstants';
import { CREATE_PROJECT_SAGA } from '../../../redux/constants/Jira/ProjectConstants';

function ProjectManagerAdd(props) {
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    const dispatch = useDispatch();

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setFieldValue
    } = props;

    useEffect(() => {
        // Gọi API để lấy dữ liệu thẻ select
        dispatch({type: GET_ALL_PROJECT_CATEGORY_SAGA});
    }, [])

    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content);
    }
    return (
        <div className='container m-5'>
            <h3>Create Project</h3>
            <form className='container' onSubmit={handleSubmit} onChange={handleChange}>
                <div className='form-group'>
                    <p>Name</p>
                    <input type="text" className='form-control' name='projectName' />
                </div>
                <div className='form-group'>
                    <p>Description</p>
                    <Editor
                        apiKey='dolk1pdfx8gwxm6j90etg8e6cp9b4pzlyhks47w4tsy1p22h'
                        name='description'
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
                <div className='form-group'>
                    <select name="categoryId" className='form-control' onChange={handleChange}>
                        {arrProjectCategory.map((item, index) => {
                            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                        })}
                    </select>
                </div>
                <button className='btn btn-outline-primary mb-5' type='submit'>Create project</button>
            </form>
        </div>
    )
}

const ProjectManagerAddForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        // console.log('propvalue', props)
        return {
            projectName: '',
            description: '',
            categoryId: props.arrProjectCategory[0]?.id
        }
    },
    validationSchema: Yup.object().shape({

    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        // console.log(values);
        // console.log('props', props);
        props.dispatch({
            type: CREATE_PROJECT_SAGA,
            newProject: values
        })
    },
    displayName: 'CreateProjectFormik',
})(ProjectManagerAdd);

const mapStateToProps = (state) => ({
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
})


export default connect(mapStateToProps)(ProjectManagerAddForm);