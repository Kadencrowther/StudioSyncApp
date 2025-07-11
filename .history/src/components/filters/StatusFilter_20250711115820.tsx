import React from "react";
import { ChargeStatus } from "../../types";

interface Props {
  value: ChargeStatus | "all";
  onChange: (val: ChargeStatus | "all") => void;
}

const statusOptions = [
  { value: "all", label: "All" },
  { value: "paid", label: "Paid" },
  { value: "unpaid", label: "Unpaid" },
  { value: "partial", label: "Partial" },
];

const StatusFilter: React.FC<Props> = ({ value, onChange }) => (
  <select
    className="border rounded px-2 py-1 bg-white text-gray-700"
    value={value}
    onChange={(e) => onChange(e.target.value as ChargeStatus | "all")}
  >
    {statusOptions.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default StatusFilter;
