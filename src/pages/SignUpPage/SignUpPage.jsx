import React from 'react'
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { signinAction, signupAction } from '../../redux/actions/UserAction';
import { NavLink } from 'react-router-dom';


function SignUpPage(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    return (
        <form onSubmit={handleSubmit} className='container' style={{ height: window.innerHeight }}>
            <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: window.innerHeight }}>
                <h3 className='text-center'>Sign Up</h3>
                <div className='d-flex mt-3'>
                    <Input onChange={handleChange} name='name' style={{ minWidth: 300 }} placeholder="Name" prefix={<UserOutlined />} />
                </div>
                <div className='text-danger'>{errors.name}</div>
                <div className='d-flex mt-3'>
                    <Input type='number' onChange={handleChange} name='phoneNumber' style={{ minWidth: 300 }} placeholder="Phone number" prefix={<PhoneOutlined />} />
                </div>
                <div className='text-danger'>{errors.phoneNumber}</div>
                <div className='d-flex mt-3'>
                    <Input onChange={handleChange} name='email' style={{ minWidth: 300 }} placeholder="Email" prefix={<MailOutlined />} />
                </div>
                <div className='text-danger'>{errors.email}</div>
                <div className='d-flex mt-3'>
                    <Input onChange={handleChange} style={{ minWidth: 300 }} type='password' name='passWord' placeholder="Password" prefix={<LockOutlined />} />
                </div>
                <div className='text-danger'>{errors.passWord}</div>
                <Button htmlType='submit' size='large' style={{ minWidth: 300, backgroundColor: 'rgb(102, 117, 223)' }} className='mt-3 text-white'>Signup</Button>
                <div className='link-register'>
                    Already a member?
                    <NavLink className="text-dark" to='/login'>Log In</NavLink>
                </div>
            </div>
        </form>
    )
}
const SignUpWithFormik = withFormik({
    mapPropsToValues: () => ({
        name: '',
        phoneNumber: '',
        email: '',
        passWord: ''
    }),
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required').min(3, 'Name must have min 3 characters').max(30, 'Name have max 30 characters'),
        phoneNumber: Yup.number().required('Phone number is required'),
        email: Yup.string().required('Email is required').email('Email is invalid!'),
        passWord: Yup.string().min(6, 'Password must have min 6 characters').max(32, 'Password have max 32 characters')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        console.log(values);
        props.dispatch(signupAction(values));
    },

    displayName: 'Login',
})(SignUpPage);


export default connect()(SignUpWithFormik);