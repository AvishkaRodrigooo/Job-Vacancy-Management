
import { useState } from 'react';
import './FormApplication.css'


const FormApplication = (props) => {
    const { label, errorMessage, onChange, ...inputProps } = props;
    
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState(false);
  
    const handleInputChange = (e) => {
      onChange(e); // Propagate the change event
      setError(!e.target.validity.valid); // Update error state based on validity
    };
  
    const handleBlur = () => {
      setTouched(true); // Mark the input as touched when it's blurred
    };
  
    return (
      <div className="formInput">
        <label>{label}</label>
        {inputProps.type === 'select' ? (
                <select
                    {...inputProps}
                    onChange={handleInputChange}
                    onBlur={handleBlur} // Triggered when the input is blurred
                >
                    {inputProps.options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            ) : (
                <input
                    {...inputProps}
                    onChange={handleInputChange}
                    onBlur={handleBlur} // Triggered when the input is blurred
                />
            )}
            {touched && error && <span>{errorMessage}</span>} {/* Display error message when input is touched and invalid */}
        </div>
    );
};

export default FormApplication;