import React from 'react';
import Button from './Button';

interface CreateButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({ 
  onClick, 
  label = "Add +", 
  className = "" 
}) => {
  return (
    <Button
      variant="primary"
      size="md"
      onClick={onClick}
      className={`bg-brand-500 text-white hover:bg-brand-600 ${className}`}
    >
      {label}
    </Button>
  );
};

export default CreateButton; 