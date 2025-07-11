import React from "react";
import FeesTable from "../components/tables/FeesTable";
import CreateFeeModal from "../components/modals/CreateFeeModal";

const Fees: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Fees</h1>
      <CreateFeeModal />
      <FeesTable />
    </div>
  );
};

export default Fees;
