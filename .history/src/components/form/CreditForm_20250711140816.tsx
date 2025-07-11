import React, { useState } from "react";
import { Credit } from "../../types";
import CreditForm from "../components/form/CreditForm";

interface Props {
  families: { id: string; name: string }[];
  onSave?: (credit: Credit) => void;
}

const CreditForm: React.FC<Props> = ({ families, onSave }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [familyId, setFamilyId] = useState("");
  const [notes, setNotes] = useState("");
  const [active, setActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount || !familyId) return;
    const credit: Credit = {
      id: Math.random().toString(36).slice(2),
      name,
      amount,
      familyId,
      notes,
      active,
    };
    if (onSave) onSave(credit);
    setName("");
    setAmount(0);
    setFamilyId("");
    setNotes("");
    setActive(true);
  };

  return (
    <form className="bg-white p-6 rounded shadow mb-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Create/Edit Credit</h2>
      <div className="mb-3">
        <label className="block font-semibold mb-1">Credit Name</label>
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
        <label className="block font-semibold mb-1">Family</label>
        <select
          className="border rounded px-2 py-1 w-full"
          value={familyId}
          onChange={(e) => setFamilyId(e.target.value)}
          required
        >
          <option value="">Select a family</option>
          {families.map((fam) => (
            <option key={fam.id} value={fam.id}>
              {fam.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="block font-semibold mb-1">Notes</label>
        <textarea
          className="border rounded px-2 py-1 w-full"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
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
        Save Credit
      </button>
    </form>
  );
};

export default CreditForm;
