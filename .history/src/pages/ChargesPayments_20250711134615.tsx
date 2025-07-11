import React, { useState, useEffect } from "react";
import ChargesTable from "../components/tables/ChargesTable";
import PostChargesButton from "../components/buttons/PostChargesButton";
import ProcessPaymentsButton from "../components/buttons/ProcessPaymentsButton";
import StatusFilter from "../components/filters/StatusFilter";
import FamilyFilter from "../components/filters/FamilyFilter";
import PageWrapper from "../components/layout/PageWrapper";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

import { fetchCharges } from "../firebase/chargesApi";
import { Charge, ChargeStatus } from "../types";

const ChargesPayments: React.FC = () => {
  // State to hold charges data and filters
  const [charges, setCharges] = useState<Charge[]>([]);
  const [status, setStatus] = useState<ChargeStatus | "all">("all");
  const [loading, setLoading] = useState(false);
  const [family, setFamily] = useState<string | "all">("all"); // added family filter state

  // Function to load charges data from backend (filtered by status and family)
  const loadCharges = async () => {
    setLoading(true);
    // Here, you might want to pass both status and family to fetchCharges if supported
    const data = await fetchCharges(status, family); // adjust fetchCharges accordingly
    setCharges(data);
    setLoading(false);
  };

  // Reload charges when status or family changes
  useEffect(() => {
    loadCharges();
  }, [status, family]);

  return (
    <PageWrapper>
      <Header />
      <Sidebar />

      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Charges & Payments
        </h1>

        {/* Filters and Buttons in a row */}
        <div className="flex gap-4 mb-6">
          {/* Controlled filters */}
          <StatusFilter value={status} onChange={setStatus} />
          <FamilyFilter value={family} onChange={setFamily} />

          {/* Buttons with callbacks to reload data */}
          <PostChargesButton onPosted={loadCharges} />
          <ProcessPaymentsButton onProcessed={loadCharges} />
        </div>

        {/* Show loading or table */}
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <ChargesTable charges={charges} />
        )}
      </div>
    </PageWrapper>
  );
};

export default ChargesPayments;
