import React from 'react';
import './styles.css';

interface InputProps {
  placeholder?: string;
  inputType: string;
  value: string;
  handleChange(value: any): void;
}

const Input: React.FC<InputProps> = props => {
  return (
    <div className='input-container'>
      <input
        value={props.value}
        className='input-field'
        onChange={props.handleChange}
        type={props.inputType}
        placeholder={props.placeholder || ''}
      />
    </div>
  );
};

export default Input;
