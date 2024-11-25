import { forwardRef } from 'react';

const FormField = forwardRef(({ label, error, type = 'text', ...props }, ref) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name} className="form-label">
        {label}
      </label>
      {type === 'file' ? (
        <input
          type={type}
          id={props.name}
          ref={ref}
          className={`form-input ${error ? 'form-input-error' : ''}`}
          {...props}
        />
      ) : (
        <input
          type={type}
          id={props.name}
          ref={ref}
          className={`form-input ${error ? 'form-input-error' : ''}`}
          {...props}
        />
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;
