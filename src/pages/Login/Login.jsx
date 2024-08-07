import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signup } from '../../fiirebase';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
  
  const [signState, setSignState] = useState('Sign In');

  const [loading, setLoading] = useState(false)

  const signupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required Name'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required Email'),
    password: Yup.string()
      .min(6, 'should be 6 chars minimum.')
      .required('Required Password'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const signinSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required Email'),
    password: Yup.string()
      .min(6, 'should be 6 chars minimum.')
      .required('Required Password'),
  });

  const handleAuth = async (values, { setSubmitting }) => {
    const { name, email, password } = values;
    setLoading(true)
    if (signState === 'Sign In') {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setSubmitting(false);
    setLoading(false)
  };

  return (
    loading ? <div className="login-spinner"><img src={netflix_spinner} alt="" /></div> : 
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className='login-form'>
        <h1>{signState}</h1>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={signState === 'Sign Up' ? signupSchema : signinSchema}
          onSubmit={handleAuth}
        >
          {({ isSubmitting }) => (
            <Form>
              {signState === 'Sign Up' && (
                <>
                  <Field type="text" name="name" placeholder="Your Name" />
                  <ErrorMessage className='error-msg' name="name" component="div" />
                </>
              )}
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage className='error-msg' name="email" component="div" />
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage className='error-msg' name="password" component="div" />
              {signState === 'Sign Up' && (
                <>
                  <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
                  <ErrorMessage className='error-msg' name="confirmPassword" component="div" />
                </>
              )}
              <button type="submit" disabled={isSubmitting}>
                {signState}
              </button>
              <div className="form-help">
                <div className="remember">
                  <input type="checkbox" />
                  <label>Remember Me</label>
                </div>
                <p>Need Help?</p>
              </div>
            </Form>
          )}
        </Formik>
        <div className="form-switch">
          {signState === 'Sign In' ? (
            <p>New to Netflix? <span onClick={() => setSignState('Sign Up')}>Sign Up Now</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setSignState('Sign In')}>Sign In Now</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
