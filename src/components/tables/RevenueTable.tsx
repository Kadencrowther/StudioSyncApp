import React from "react";
import { RevenueMetrics } from "../../types";

interface Props {
  metrics: RevenueMetrics | null;
}

const RevenueTable: React.FC<Props> = ({ metrics }) => {
  if (!metrics) {
    return <div className="text-gray-500">Loading revenue data...</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-lg font-bold mb-2">Revenue This Month</h3>
        <p className="text-2xl font-bold text-blue-600">
          ${metrics.thisMonth.toFixed(2)}
        </p>
        <p
          className={
            metrics.monthChange >= 0 ? "text-green-600" : "text-red-600"
          }
        >
          {metrics.monthChange >= 0 ? "+" : "-"}
          {Math.abs(metrics.monthChange).toFixed(1)}% from last month
        </p>
      </div>
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-lg font-bold mb-2">Last 30 Days</h3>
        <p className="text-2xl font-bold text-blue-600">
          ${metrics.last30Days.toFixed(2)}
        </p>
        <p
          className={
            metrics.thirtyDayChange >= 0 ? "text-green-600" : "text-red-600"
          }
        >
          {metrics.thirtyDayChange >= 0 ? "+" : "-"}
          {Math.abs(metrics.thirtyDayChange).toFixed(1)}% from previous period
        </p>
      </div>
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-lg font-bold mb-2">Outstanding Balances</h3>
        <p className="text-2xl font-bold text-red-600">
          ${metrics.outstandingBalances.toFixed(2)}
        </p>
        <p className="text-gray-700">
          {metrics.unpaidInvoices} unpaid invoices
        </p>
      </div>
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-lg font-bold mb-2">
          Accounts with Outstanding Balances
        </h3>
        <p className="text-2xl font-bold text-red-600">
          {metrics.accountsWithBalance}
        </p>
        <p className="text-gray-700">
          {metrics.accountsWithBalancePercent.toFixed(1)}% of total accounts
        </p>
      </div>
    </div>
  );
};

export default RevenueTable;
