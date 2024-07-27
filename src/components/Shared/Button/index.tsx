import React from 'react';

interface ButtonProps {
  label: string;
  hadlerClick(): void;
}

const Button: React.FC<ButtonProps> = props => {
  return (
    <div onClick={props.hadlerClick}>
      <span>{props.label}</span>
    </div>
  );
};

export default Button;
