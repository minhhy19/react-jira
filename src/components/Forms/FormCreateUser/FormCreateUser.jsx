import React, { useEffect } from 'react'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, connect } from 'react-redux'
import { SET_SUBMIT_CREATE_USER } from '../../../redux/constants/DrawerConstant';
import { USER_SIGNUP_API } from '../../../redux/constants/Jira/UserConstants';


function FormCreateUser(props) {
    const dispatch = useDispatch();
    //Do kết nối với withformik => component có các props
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

        // Đưa hàm handle submit lên drawer reducer để cập nhật lại sự kiện cho nút submit
        dispatch({ type: SET_SUBMIT_CREATE_USER, submitFunction: handleSubmit })
    }, [])

    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className="form-group">
                <p>Name</p>
                <input name="name" className="form-control" onChange={handleChange}/>
                <div className='text-danger'>{errors.name}</div>
            </div>
            <div className="form-group">
                <p>Email</p>
                <input name="email" className="form-control" onChange={handleChange}/>
                <div className='text-danger'>{errors.email}</div>
            </div>
            <div className="form-group">
                <p>Password</p>
                <input type='password' name="passWord" className="form-control" onChange={handleChange}/>
                <div className='text-danger'>{errors.passWord}</div>
            </div>
            <div className="form-group">
                <p>Phone Number</p>
                <input type='number' name="phoneNumber" className="form-control" onChange={handleChange}/>
                <div className='text-danger'>{errors.phoneNumber}</div>
            </div>
        </form>
    )
}

const formCreateUser = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            name: '',
            email: '',
            passWord: '',
            phoneNumber: 0,
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required').min(3, 'Name must have min 3 characters').max(30, 'Name have max 30 characters'),
        phoneNumber: Yup.number().required('Phone number is required'),
        email: Yup.string().required('Email is required').email('Email is invalid!'),
        passWord: Yup.string().min(6, 'Password must have min 6 characters').max(32, 'Password have max 32 characters')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({type: USER_SIGNUP_API, userSignUp: values});
        // console.log('userobject', values)
    },
    displayName: 'createUserForm',
})(FormCreateUser);

export default connect()(formCreateUser);
