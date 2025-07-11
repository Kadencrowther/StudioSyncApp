import React, { useState, useEffect } from "react";
import ChargesTable from "../components/tables/ChargesTable";
import StatusFilter from "../components/filters/StatusFilter";
import PostChargesButton from "../components/buttons/PostChargesButton";
import ProcessPaymentsButton from "../components/buttons/ProcessPaymentsButton";
import { fetchCharges } from "../firebase/chargesApi";
import { Charge, ChargeStatus } from "../types";

const ChargesPayments: React.FC = () => {
  const [charges, setCharges] = useState<Charge[]>([]);
  const [status, setStatus] = useState<ChargeStatus | "all">("all");
  const [loading, setLoading] = useState(false);

  const loadCharges = async () => {
    setLoading(true);
    const data = await fetchCharges(status);
    setCharges(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCharges();
  }, [status]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Charges & Payments
      </h1>
      <div className="flex gap-4 mb-6">
        <StatusFilter value={status} onChange={setStatus} />
        <PostChargesButton onPosted={loadCharges} />
        <ProcessPaymentsButton onProcessed={loadCharges} />
      </div>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ChargesTable charges={charges} />
      )}
    </div>
  );
};

export default ChargesPayments;
