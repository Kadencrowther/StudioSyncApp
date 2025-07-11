import React, { useState } from "react";
import { Discount } from "../../types";

interface Props {
  onSave?: (discount: Discount) => void;
}

const DiscountForm: React.FC<Props> = ({ onSave }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Fixed");
  const [amount, setAmount] = useState<number>(0);
  const [associationType, setAssociationType] = useState("");
  const [associationItem, setAssociationItem] = useState("");
  const [code, setCode] = useState("");
  const [active, setActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !name ||
      !type ||
      !amount ||
      !associationType ||
      (associationType === "Code" && !code)
    )
      return;
    const discount: Discount = {
      id: Math.random().toString(36).slice(2),
      name,
      type,
      amount,
      associatedWith:
        associationType === "Code"
          ? code
          : `${associationType}: ${associationItem}`,
      active,
    };
    if (onSave) onSave(discount);
    setName("");
    setType("Fixed");
    setAmount(0);
    setAssociationType("");
    setAssociationItem("");
    setCode("");
    setActive(true);
  };

  return (
    <form className="bg-white p-6 rounded shadow mb-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Create/Edit Discount</h2>
      <div className="mb-3">
        <label className="block font-semibold mb-1">Discount Name</label>
        <input
          className="border rounded px-2 py-1 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          <option value="Fixed">Fixed Amount</option>
          <option value="Percentage">Percentage</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="block font-semibold mb-1">Amount</label>
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
        <label className="block font-semibold mb-1">Apply To</label>
        <select
          className="border rounded px-2 py-1 w-full"
          value={associationType}
          onChange={(e) => setAssociationType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Season">Season</option>
          <option value="Student">Student</option>
          <option value="Family">Family</option>
          <option value="Code">By Code</option>
        </select>
        {associationType === "Code" ? (
          <input
            className="border rounded px-2 py-1 w-full mt-2"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter discount code"
            required
          />
        ) : (
          <input
            className="border rounded px-2 py-1 w-full mt-2"
            value={associationItem}
            onChange={(e) => setAssociationItem(e.target.value)}
            placeholder="Enter item name or ID"
            required
          />
        )}
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
        Save Discount
      </button>
    </form>
  );
};

export default DiscountForm;
