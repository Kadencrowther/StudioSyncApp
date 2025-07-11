import React, { useEffect, useState } from "react";
import RevenueTable from "../components/tables/RevenueTable";
import { fetchRevenue } from "../firebase/revenueApi";
import { RevenueMetrics } from "../types";

const Revenue: React.FC = () => {
  const [metrics, setMetrics] = useState<RevenueMetrics | null>(null);

  useEffect(() => {
    fetchRevenue().then(setMetrics);
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Revenue</h1>
      <RevenueTable metrics={metrics} />
    </div>
  );
};

export default Revenue;
