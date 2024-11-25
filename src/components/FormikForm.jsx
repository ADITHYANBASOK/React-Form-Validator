import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useRef } from 'react';
import FormField from './FormField';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  photo: Yup.mixed()
    .required('Photo is required')
    .test(
      'fileType',
      'Only JPG, JPEG, and PNG files are allowed',
      (value) =>
        value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
    ),
  document: Yup.mixed()
    .required('Document is required')
    .test(
      'fileType',
      'Only PDF files are allowed',
      (value) => value && value.type === 'application/pdf'
    ),
  number: Yup.string()
    .typeError('Must be a valid number')
    .required('Number is required')
    .matches(/^\+?\d{6,12}$/, 'Phone number must be between 6 and 12 digits and can include an optional "+" sign'),
});

function FormikForm({ onSuccessfulSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const photoInputRef = useRef(null);
  const documentInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      photo: null,
      document: null,
      number: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    validateOnBlur: true, 
    validateOnChange: true, 
    onSubmit: async (values) => {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('photo', values.photo);
      formData.append('document', values.document);
      formData.append('number', values.number);
      formData.append('password', values.password);

      console.log('Form Data:', formData);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitting(false);
      setSubmitSuccess(true);
      onSuccessfulSubmit();

      setTimeout(() => setSubmitSuccess(false), 3000);
      formik.resetForm();

      // Clear file inputs
      if (photoInputRef.current) photoInputRef.current.value = '';
      if (documentInputRef.current) documentInputRef.current.value = '';
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <FormField
        label="Name"
        name="name"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && formik.errors.name}
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && formik.errors.email}
      />

      <FormField
        label="Photo"
        name="photo"
        type="file"
        inputRef={photoInputRef} 
        onChange={(event) => {
          formik.setFieldValue('photo', event.currentTarget.files[0]);
          formik.setFieldTouched('photo', true); 
        }}
        error={formik.touched.photo && formik.errors.photo}
      />

      <FormField
        label="Document"
        name="document"
        type="file"
        inputRef={documentInputRef} 
        onChange={(event) => {
          formik.setFieldValue('document', event.currentTarget.files[0]);
          formik.setFieldTouched('document', true); 
        }}
        error={formik.touched.document && formik.errors.document}
      />

      <FormField
        label="Number"
        name="number"
        type="number"
        value={formik.values.number}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.number && formik.errors.number}
      />

      <FormField
        label="Password"
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && formik.errors.password}
      />

      <FormField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
      />

      {submitSuccess && (
        <div className="text-green-600 text-sm">Form submitted successfully!</div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !formik.isValid}
        className="submit-button"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

export default FormikForm;
