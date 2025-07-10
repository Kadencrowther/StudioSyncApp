import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface TableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const TableActions: React.FC<TableActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-end space-x-1 min-w-[100px]">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
      >
        <PencilIcon className="h-4 w-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TableActions; 