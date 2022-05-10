import React, { useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect, useSelector, useDispatch } from 'react-redux';
import { GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../redux/constants/CyberBugs/CyberBugs';

function FormEditProject(props) {
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
        dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });

        // load sự kiện submit lên drawer nút submit
        dispatch({ type: 'SET_SUBMIT_EDIT_PROJECT', submitFunction: handleSubmit });
    }, [])

    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }
    return (
        <form className='container-fluid' onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project id</p>
                        <input value={values.id} disabled type="text" className='form-control' name='id' />
                    </div>
                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project name</p>
                        <input value={values.projectName} onChange={handleChange} type="text" className='form-control' name='projectName' />
                    </div>
                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project category</p>
                        <select name="categoryId" value={values.categoryId} className='form-control' onChange={handleChange}>
                            {arrProjectCategory?.map((item, index) => {
                                return <option key={item.id} value={item.id} >{item.projectCategoryName}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Description</p>
                        <Editor
                            name="description123"
                            // initialValue={values.description}
                            value={values.description}
                            init={{
                                selector: 'textarea#myTextArea',
                                height: 500,
                                defaultValue: '',
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



const editProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        // console.log('propvalue', props)
        const { projectEdit } = props;
        return {
            id: projectEdit?.id,
            projectName: projectEdit.projectName,
            description: projectEdit.description,
            categoryId: projectEdit.categoryId
        }
    },
    validationSchema: Yup.object().shape({

    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        // Khi ng dùng bấm submit => đưa dữ liệu ng dùng từ backend thông qua API
        const action = {
            type: 'UPDATE_PROJECT_SAGA',
            projectUpdate: values
        }
        // Gọi saga
        props.dispatch(action)
    },
    displayName: 'CreateProjectFormik',
})(FormEditProject);

const mapStateToProps = (state) => ({
    projectEdit: state.ProjectReducer.projectEdit
})


export default connect(mapStateToProps)(editProjectForm);