import React from "react";
import { Fee } from "../../types";

interface Props {
  fees: Fee[];
}

const FeesTable: React.FC<Props> = ({ fees }) => (
  <table className="min-w-full border rounded shadow mt-6">
    <thead>
      <tr className="bg-blue-100">
        <th className="px-4 py-2">Fee Name</th>
        <th className="px-4 py-2">Amount</th>
        <th className="px-4 py-2">Type</th>
        <th className="px-4 py-2">Associated With</th>
        <th className="px-4 py-2">Active</th>
      </tr>
    </thead>
    <tbody>
      {fees.length === 0 ? (
        <tr>
          <td colSpan={5} className="text-center text-gray-400 py-4">
            No fees found.
          </td>
        </tr>
      ) : (
        fees.map((fee) => (
          <tr key={fee.id}>
            <td className="px-4 py-2">{fee.name}</td>
            <td className="px-4 py-2">${fee.amount.toFixed(2)}</td>
            <td className="px-4 py-2">{fee.type}</td>
            <td className="px-4 py-2">{fee.associatedWith}</td>
            <td className="px-4 py-2">{fee.active ? "Yes" : "No"}</td>
          </tr>
        ))
      )}
    </tbody>
  </table>
);

export default FeesTable;
