import React from 'react';
import * as yup from 'yup';
import { Formik, Form, ErrorMessage, Field } from 'formik';

const AddTaskForm = (props) => {
  const { addTask, loadTasks, page, field, direction } = props;
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .label('Username')
      .required(),
    email: yup
      .string()
      .label('Email')
      .required('Email required')
      .email('Email is invalid'),
    text: yup
      .string()
      .label('Text')
      .required(),
  });

  return (
    <div className="addTask">
      <Formik
        initialValues={{
          username: '',
          email: '',
          text: '',
        }}
        onSubmit={(values) => {
          const { username, email, text } = values;
          const formData = new FormData();

          formData.append('username', username);
          formData.append('email', email);
          formData.append('text', text);

          addTask(formData);
          loadTasks(page, field, direction);
        }}
        validationSchema={validationSchema}
      >
        {formProps => (
          <Form>
            <div>
              <span className="title">Add new task</span>
            </div>
            <div>
              <span>Username</span>
              <Field type="text" name="username" autoComplete="off" />
              <ErrorMessage name="username" component="div" className="error-msg" />
            </div>
            <div>
              <span>Email</span>
              <Field type="email" name="email" autoComplete="off" />
              <ErrorMessage name="email" component="div" className="error-msg" />
            </div>
            <div>
              <span>Text</span>
              <Field type="text" name="text" />
              <ErrorMessage name="text" component="div" className="error-msg" />
            </div>
            <div className="submit">
              <button type="submit" className="submit-btn" onClick={formProps.handleSubmit}>
                Add this
              </button>
              <div className="error-msg global">{formProps.errors.general}</div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTaskForm;
