import React from 'react';
import { SettingsModalProps } from '../../../types/settings';
import { CreditCardIcon } from '@heroicons/react/24/outline';

const SubscriptionBillingModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Current Plan
        </label>
        <select className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90">
          <option value="basic">Basic Plan</option>
          <option value="pro">Pro Plan</option>
          <option value="enterprise">Enterprise Plan</option>
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Billing Cycle
        </label>
        <select className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90">
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly (Save 20%)</option>
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Payment Method
        </label>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center">
              <CreditCardIcon className="w-5 h-5 mr-2" />
              <span>•••• 4242</span>
            </div>
            <button className="text-sm text-brand-500">Change</button>
          </div>
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

export default SubscriptionBillingModal; 