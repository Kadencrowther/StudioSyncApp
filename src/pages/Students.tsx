import React from 'react';

const Students: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Students</h1>
      <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
        <p className="text-gray-600 dark:text-gray-300">Manage your students here</p>
      </div>
    </div>
  );
};

export default Students; 