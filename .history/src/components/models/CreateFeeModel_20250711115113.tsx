import React, { useState } from "react";
import { Fee } from "../../types";

interface Props {
  onSave?: (fee: Fee) => void;
}

const CreateFeeModal: React.FC<Props> = ({ onSave }) => {
  const [show, setShow] = useState(false);
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
    setShow(false);
    setName("");
    setAmount(0);
    setType("OneTime");
    setAssociationType("");
    setAssociationItem("");
    setActive(true);
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setShow(true)}
      >
        Create New Fee
      </button>
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-8 w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">Create New Fee</h2>
            <form onSubmit={handleSubmit}>
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
                <label className="block font-semibold mb-1">
                  Associate With
                </label>
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
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save Fee
                </button>
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => setShow(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateFeeModal;
