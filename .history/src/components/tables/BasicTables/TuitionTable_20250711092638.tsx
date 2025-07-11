import React from "react";
import { TuitionRate } from "../../types";

interface Props {
  rates: TuitionRate[];
}

const TuitionTable: React.FC<Props> = ({ rates }) => (
  <table className="min-w-full border rounded shadow mt-6">
    <thead>
      <tr className="bg-blue-100">
        <th className="px-4 py-2">Rate Name</th>
        <th className="px-4 py-2">Hours/Rates</th>
        <th className="px-4 py-2">Family Discount</th>
        <th className="px-4 py-2">Max Per Student</th>
        <th className="px-4 py-2">Max Per Family</th>
        <th className="px-4 py-2">Active</th>
      </tr>
    </thead>
    <tbody>
      {rates.length === 0 ? (
        <tr>
          <td colSpan={6} className="text-center text-gray-400 py-4">
            No tuition rates found.
          </td>
        </tr>
      ) : (
        rates.map((rate) => (
          <tr key={rate.id}>
            <td className="px-4 py-2">{rate.name}</td>
            <td className="px-4 py-2">
              {rate.hourRates.map((hr) => (
                <div key={hr.hours}>
                  {hr.hours} hrs: ${hr.rate.toFixed(2)}
                </div>
              ))}
            </td>
            <td className="px-4 py-2">
              {rate.familyDiscount
                ? rate.familyDiscount.type === "percentage"
                  ? `${rate.familyDiscount.amount}% after ${rate.familyDiscount.studentThreshold} student(s)`
                  : `$${rate.familyDiscount.amount.toFixed(2)} after ${
                      rate.familyDiscount.studentThreshold
                    } student(s)`
                : "None"}
            </td>
            <td className="px-4 py-2">
              ${rate.maxPerStudent?.toFixed(2) ?? "—"}
            </td>
            <td className="px-4 py-2">
              ${rate.maxPerFamily?.toFixed(2) ?? "—"}
            </td>
            <td className="px-4 py-2">{rate.active ? "Yes" : "No"}</td>
          </tr>
        ))
      )}
    </tbody>
  </table>
);

export default TuitionTable;
