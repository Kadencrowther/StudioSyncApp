import React, { useState } from "react";
import { Credit } from "../../types";

interface Props {
  families: { id: string; name: string }[];
  onSave?: (credit: Credit) => void;
}

const CreateCreditModal: React.FC<Props> = ({ families, onSave }) => {
  const [show, setShow] = useState(false);
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
    setShow(false);
    setName("");
    setAmount(0);
    setFamilyId("");
    setNotes("");
    setActive(true);
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setShow(true)}
      >
        Create New Credit
      </button>
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-8 w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">Create New Credit</h2>
            <form onSubmit={handleSubmit}>
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
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save Credit
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

export default CreateCreditModal;
