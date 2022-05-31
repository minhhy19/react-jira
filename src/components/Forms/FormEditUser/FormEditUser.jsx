import React, { useEffect } from 'react'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, connect } from 'react-redux'
import { SET_SUBMIT_CREATE_USER } from '../../../redux/constants/DrawerConstant';
import { UPDATE_USER_SAGA } from '../../../redux/constants/Jira/UserConstants';


function FormEditUser(props) {
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
                <p>Id</p>
                <input value={values.id} disabled name="id" className="form-control"/>
            </div>
            <div className="form-group">
                <p>Name</p>
                <input value={values.name} name="name" className="form-control" onChange={handleChange}/>
                <div className='text-danger'>{errors.name}</div>
            </div>
            <div className="form-group">
                <p>Email</p>
                <input value={values.email} name="email" className="form-control" onChange={handleChange}/>
                <div className='text-danger'>{errors.email}</div>
            </div>
            <div className="form-group">
                <p>Password</p>
                <input value={values.passWord} type='password' name="passWord" className="form-control" onChange={handleChange}/>
                <div className='text-danger'>{errors.passWord}</div>
            </div>
            <div className="form-group">
                <p>Phone Number</p>
                <input value={values.phoneNumber} type='number' name="phoneNumber" className="form-control" onChange={handleChange}/>
                <div className='text-danger'>{errors.phoneNumber}</div>
            </div>
        </form>
    )
}

const formEditUser = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { userEdit } = props;
        return {
            id: userEdit?.userId,
            name: userEdit?.name,
            email: userEdit?.email,
            passWord: '',
            phoneNumber: userEdit?.phoneNumber,
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required').min(3, 'Name must have min 3 characters').max(30, 'Name have max 30 characters'),
        phoneNumber: Yup.number().required('Phone number is required'),
        email: Yup.string().required('Email is required').email('Email is invalid!'),
        passWord: Yup.string().min(6, 'Password must have min 6 characters').max(32, 'Password have max 32 characters')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({type: UPDATE_USER_SAGA, userEdit: values});
        // console.log('userobject', values)
    },
    displayName: 'editUserForm',
})(FormEditUser);

const mapStateToProps = (state) => ({
    userEdit: state.UserReducer.userEdit
})

export default connect(mapStateToProps)(formEditUser);
