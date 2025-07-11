import React, { useState } from "react";
import { Charge } from "../../types";

interface Props {
  charges: Charge[];
}

const statusColor: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  unpaid: "bg-red-100 text-red-700",
  partial: "bg-yellow-100 text-yellow-700",
};

const ChargesTable: React.FC<Props> = ({ charges }) => {
  const [selectedCharge, setSelectedCharge] = useState<Charge | null>(null);

  return (
    <div>
      <table className="min-w-full border rounded shadow">
        <thead>
          <tr className="bg-blue-100">
            <th className="px-4 py-2">Family Name</th>
            <th className="px-4 py-2">Charge Amount</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Charge Date</th>
          </tr>
        </thead>
        <tbody>
          {charges.map((charge) => (
            <tr
              key={charge.id}
              className="hover:bg-blue-50 cursor-pointer"
              onClick={() => setSelectedCharge(charge)}
            >
              <td className="px-4 py-2">{charge.familyName}</td>
              <td className="px-4 py-2">${charge.amount.toFixed(2)}</td>
              <td
                className={`px-4 py-2 font-bold rounded ${
                  statusColor[charge.status]
                }`}
              >
                {charge.status}
              </td>
              <td className="px-4 py-2">{charge.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCharge && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-bold mb-2">
            Payment History for {selectedCharge.familyName}
          </h3>
          {selectedCharge.paymentHistory.length === 0 ? (
            <p>No payments yet.</p>
          ) : (
            <ul>
              {selectedCharge.paymentHistory.map((payment) => (
                <li key={payment.id}>
                  Paid ${payment.amount} on {payment.date}
                </li>
              ))}
            </ul>
          )}
          <button
            className="mt-2 px-3 py-1 bg-gray-300 rounded"
            onClick={() => setSelectedCharge(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ChargesTable;
