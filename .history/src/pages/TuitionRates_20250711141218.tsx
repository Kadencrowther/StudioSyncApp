import React from "react";

import TuitionForm from "../components/forms/TuitionForm";

const TuitionRates: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Tuition Rates</h1>
      <TuitionForm />
    </div>
  );
};

export default TuitionRates;
