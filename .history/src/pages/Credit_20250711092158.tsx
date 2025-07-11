import React from "react";
import CreditForm from "../components/forms/CreditForm";
import CreateCreditModal from "../components/modals/CreateCreditModal";

const Credit: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Credit</h1>
      <CreateCreditModal />
      <CreditForm />
    </div>
  );
};

export default Credit;
