import React from 'react';
import { Modal } from '../../ui/modal';
import { ClassData } from '../../../types/class.types';

interface DeleteClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (classId: string) => Promise<void>;
  classData: ClassData | null;
}

const DeleteClassModal: React.FC<DeleteClassModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  classData,
}) => {
  const handleConfirm = async () => {
    try {
      if (!classData) {
        console.error('No class data available for deletion');
        return;
      }
      await onConfirm(classData.id);
      onClose();
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  if (!classData) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[500px] p-6"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full dark:bg-red-900/20">
          <svg
            className="w-6 h-6 text-red-600 dark:text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <div className="mt-4 text-center">
          <h5 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
            Delete Class
          </h5>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete "{classData.ClassName}"? This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete Class
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteClassModal; 