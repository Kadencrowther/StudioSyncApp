import React from 'react';
import CreateButton from '../ui/button/CreateButton';

interface CalendarHeaderProps {
  onCreateClick: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ onCreateClick }) => {
  return (
    <CreateButton 
      onClick={onCreateClick}
      label="Add Class +"
      className="w-full sm:w-auto whitespace-nowrap"
    />
  );
};

export default CalendarHeader; 