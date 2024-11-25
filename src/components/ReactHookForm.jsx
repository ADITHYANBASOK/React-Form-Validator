import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState, useRef } from 'react';
import FormField from './FormField';

const schema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  photo: yup
    .mixed()
    .required('Photo is required')
    .test(
      'fileType',
      'Only JPG, JPEG, and PNG files are allowed',
      (value) =>
        value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0]?.type)
    ),
    phone: yup
    .string()
    .matches(/^\+?\d{6,12}$/, 'Phone number must be between 6 and 12 digits and can include an optional "+" sign')
    .required('Phone number is required'),
  document: yup
    .mixed()
    .required('Document is required')
    .test(
      'fileType',
      'Only PDF files are allowed',
      (value) => value && value[0]?.type === 'application/pdf'
    ),
});

function ReactHookForm({ onSuccessfulSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Refs for file inputs
  const photoInputRef = useRef(null);
  const documentInputRef = useRef(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Prepare form data
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('photo', data.photo[0]);
    formData.append('document', data.document[0]);
    formData.append('password', data.password);

    console.log('Form Data:', formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    onSuccessfulSubmit();

    setTimeout(() => setSubmitSuccess(false), 3000);
    reset();

    // Clear file inputs manually
    if (photoInputRef.current) photoInputRef.current.value = '';
    if (documentInputRef.current) documentInputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        label="Name"
        error={errors.name?.message}
        {...register('name')}
      />

      <FormField
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <FormField
        label="Photo"
        type="file"
        error={errors.photo?.message}
        inputRef={photoInputRef} // Adding ref for manual reset
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setValue('photo', e.target.files);
          }
        }}
        {...register('photo')}
      />

      <FormField
        label="Document"
        type="file"
        error={errors.document?.message}
        inputRef={documentInputRef} // Adding ref for manual reset
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setValue('document', e.target.files);
          }
        }}
        {...register('document')}
      />
      <FormField
        label="Number"
        type="text"
        error={errors.phone?.message}
        {...register('phone')}
      />

      <FormField
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register('password')}
      />

      <FormField
        label="Confirm Password"
        type="password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      {submitSuccess && (
        <div className="text-green-600 text-sm">Form submitted successfully!</div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="submit-button"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

export default ReactHookForm;
