import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface TableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const TableActions: React.FC<TableActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={onEdit}
        className="inline-flex items-center gap-1 px-2 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
      >
        <PencilIcon className="h-4 w-4" />
        <span>Edit</span>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (window.confirm('Are you sure you want to delete this class?')) {
            onDelete();
          }
        }}
        className="inline-flex items-center gap-1 px-2 py-1 text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
      >
        <TrashIcon className="h-4 w-4" />
        <span>Delete</span>
      </button>
    </div>
  );
};

export default TableActions; 