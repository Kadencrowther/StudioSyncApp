import React from 'react';
import { SettingsModalProps } from '../../../types/settings';

const SecurityModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Change Password
        </label>
        <input
          type="password"
          className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          placeholder="Enter new password"
        />
      </div>
      <div>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox" />
          <span className="text-sm">Enable Two-Factor Authentication</span>
        </label>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Login History
        </label>
        <div className="text-sm text-gray-600">
          Last login: Today at 10:30 AM
        </div>
      </div>
      <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
        <button
          onClick={onClose}
          type="button"
          className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-success flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
          onClick={onClose}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SecurityModal; 