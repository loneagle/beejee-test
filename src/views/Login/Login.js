import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import { Formik, Form, ErrorMessage, Field } from 'formik';

import { useAuth } from '../../utils/context';
import config from '../../config';

const Login = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { setAuthTokens } = useAuth();

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .label('Login')
      .required(),
    password: yup
      .string()
      .label('Password')
      .required()
      .min(3, 'Minimum length is 3 symbols')
  });

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login">
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        onSubmit={(values, actions) => {
          const { username, password } = values;
          const formData = new FormData();
          formData.append('username', username);
          formData.append('password', password);

          const configHead = {
            headers: {
              'content-type': 'multipart/form-data'
            }
          };

          axios
            .post(`${config.address}login${config.name}`, formData, configHead)
            .then((result) => {
              const { data: { status, message } } = result;
              switch (status) {
                case 'ok':
                  setAuthTokens(message.token);
                  setLoggedIn(true);
                  break;
                case 'error':
                  const { username, password } = message;
                  if (username) {
                    actions.setFieldError('username', username);
                  } else if (password) {
                    actions.setFieldError('password', password);
                  } else actions.setFieldError('general', message);
                  break;
                default:
                  actions.setFieldError('general', 'Server error');
              }
            })
            .catch(() => {
              actions.setFieldError('general', 'Connection error');
            });
        }}
        validationSchema={validationSchema}
      >
        {formProps => (
          <Form>
            <div>
              <span className="title">Login</span>
            </div>
            <div>
              <span>Username</span>
              <Field type="text" name="username" autoComplete="off" />
              <ErrorMessage name="username" component="div" className="error-msg" />
            </div>
            <div>
              <span>Password</span>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error-msg" />
            </div>
            <div className="submit">
              <button type="submit" className="submit-btn" onClick={formProps.handleSubmit}>
                Got it
              </button>
              <div className="error-msg global">{formProps.errors.general}</div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
