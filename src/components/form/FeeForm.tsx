import React, { useState } from "react";
import { Fee } from "../../types";

interface Props {
  onSave?: (fee: Fee) => void;
}

const FeeForm: React.FC<Props> = ({ onSave }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState("OneTime");
  const [associationType, setAssociationType] = useState("");
  const [associationItem, setAssociationItem] = useState("");
  const [active, setActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount || !type || !associationType || !associationItem)
      return;
    const fee: Fee = {
      id: Math.random().toString(36).slice(2),
      name,
      amount,
      type,
      associatedWith: `${associationType}: ${associationItem}`,
      active,
    };
    if (onSave) onSave(fee);
    setName("");
    setAmount(0);
    setType("OneTime");
    setAssociationType("");
    setAssociationItem("");
    setActive(true);
  };

  return (
    <form className="bg-white p-6 rounded shadow mb-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Create/Edit Fee</h2>
      <div className="mb-3">
        <label className="block font-semibold mb-1">Fee Name</label>
        <input
          className="border rounded px-2 py-1 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="block font-semibold mb-1">Amount ($)</label>
        <input
          type="number"
          className="border rounded px-2 py-1 w-full"
          value={amount}
          min={0}
          step={0.01}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          required
        />
      </div>
      <div className="mb-3">
        <label className="block font-semibold mb-1">Type</label>
        <select
          className="border rounded px-2 py-1 w-full"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="OneTime">One Time</option>
          <option value="Recurring">Recurring</option>
          <option value="Installments">Installments</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="block font-semibold mb-1">Associate With</label>
        <select
          className="border rounded px-2 py-1 w-full"
          value={associationType}
          onChange={(e) => setAssociationType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Season">Season</option>
          <option value="Class">Class</option>
          <option value="Student">Student</option>
          <option value="Family">Family</option>
          <option value="Team">Team</option>
        </select>
        <input
          className="border rounded px-2 py-1 w-full mt-2"
          value={associationItem}
          onChange={(e) => setAssociationItem(e.target.value)}
          placeholder="Enter item name or ID"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block font-semibold mb-1">Active</label>
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Fee
      </button>
    </form>
  );
};

export default FeeForm;
