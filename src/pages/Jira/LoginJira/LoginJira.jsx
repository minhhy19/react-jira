import React from 'react'
import { Button, Input } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { UserOutlined, LockOutlined, TwitterOutlined } from '@ant-design/icons';
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { USER_SIGNIN_API } from '../../../redux/constants/CyberBugs/CyberBugs';
import { signinCyberbugAction } from '../../../redux/actions/CyberbugsAction';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});


function LoginJira(props) {
  
  console.log(props);


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
        <h3 className='text-center'>Login Cyberbugs</h3>
        <div className='d-flex mt-3'>
          <Input onChange={handleChange} name='email' style={{ minWidth: 300 }} placeholder="Email" prefix={<UserOutlined />} />
        </div>
        <div className='text-danger'>{errors.email}</div> 
        <div className='d-flex mt-3'>
          <Input onChange={handleChange} style={{ minWidth: 300 }} type='password' name='password' placeholder="Password" prefix={<LockOutlined />} />
        </div>
        <div className='text-danger'>{errors.password}</div>
        <Button htmlType='submit' size='large' style={{ minWidth: 300, backgroundColor: 'rgb(102, 117, 223)' }} className='mt-5 text-white'>Login</Button>
        <div className='social mt-3 d-flex'>
          <Button style={{backgroundColor: 'rgb(59, 89, 152)' }} type="primary" shape="circle" icon={<IconFont type="icon-facebook" />} size='large'></Button>
          <Button type="primary ml-3" shape="circle" icon={<TwitterOutlined />} size='large'></Button>
        </div>
      </div>
    </form>
  )
}
const LoginCyberBugsWithFormik = withFormik({
  mapPropsToValues: () => ({ 
    email: '',
    password: ''
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid!'),
    password: Yup.string().min(6, 'Password must have min 6 characters').max(32, 'Password have max 32 charactors')
  }),
  handleSubmit: ({ email, password }, { props, setSubmitting }) => {
    
    props.dispatch(signinCyberbugAction(email, password));
    // console.log(props)
    // console.log(values);

  },

  displayName: 'LoginCyberbugs',
})(LoginJira);


export default connect()(LoginCyberBugsWithFormik);