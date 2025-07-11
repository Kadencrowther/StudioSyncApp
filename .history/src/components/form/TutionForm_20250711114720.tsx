import React, { useState } from "react";
import { TuitionRate } from "../../types";

interface Props {
  onSave?: (rate: TuitionRate) => void;
}

const TuitionForm: React.FC<Props> = ({ onSave }) => {
  const [name, setName] = useState("");
  const [hourRates, setHourRates] = useState([{ hours: 1, rate: 0 }]);
  const [familyDiscount, setFamilyDiscount] = useState({
    type: "percentage",
    amount: 0,
    studentThreshold: 2,
  });
  const [maxPerStudent, setMaxPerStudent] = useState<number | undefined>();
  const [maxPerFamily, setMaxPerFamily] = useState<number | undefined>();

  const handleHourRateChange = (
    idx: number,
    field: "hours" | "rate",
    value: number
  ) => {
    setHourRates((rates) =>
      rates.map((r, i) => (i === idx ? { ...r, [field]: value } : r))
    );
  };

  const addHourRate = () =>
    setHourRates((rates) => [...rates, { hours: 1, rate: 0 }]);
  const removeHourRate = (idx: number) =>
    setHourRates((rates) => rates.filter((_, i) => i !== idx));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || hourRates.length === 0) return;
    const rate: TuitionRate = {
      id: Math.random().toString(36).slice(2),
      name,
      hourRates,
      familyDiscount,
      maxPerStudent,
      maxPerFamily,
      active: true,
    };
    if (onSave) onSave(rate);
    setName("");
    setHourRates([{ hours: 1, rate: 0 }]);
    setFamilyDiscount({ type: "percentage", amount: 0, studentThreshold: 2 });
    setMaxPerStudent(undefined);
    setMaxPerFamily(undefined);
  };

  return (
    <form className="bg-white p-6 rounded shadow mb-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Add/Edit Tuition Rate</h2>
      <div className="mb-3">
        <label className="block font-semibold mb-1">Rate Name</label>
        <input
          className="border rounded px-2 py-1 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="block font-semibold mb-1">Hourly Rates</label>
        {hourRates.map((hr, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="number"
              className="border rounded px-2 py-1 w-1/2"
              value={hr.hours}
              min={0}
              step={0.25}
              onChange={(e) =>
                handleHourRateChange(idx, "hours", parseFloat(e.target.value))
              }
              placeholder="Hours"
              required
            />
            <input
              type="number"
              className="border rounded px-2 py-1 w-1/2"
              value={hr.rate}
              min={0}
              step={0.01}
              onChange={(e) =>
                handleHourRateChange(idx, "rate", parseFloat(e.target.value))
              }
              placeholder="Rate"
              required
            />
            {hourRates.length > 1 && (
              <button
                type="button"
                className="text-red-500"
                onClick={() => removeHourRate(idx)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" className="text-blue-500" onClick={addHourRate}>
          Add Hour/Rate
        </button>
      </div>
      <div className="mb-3">
        <label className="block font-semibold mb-1">Family Discount</label>
        <select
          className="border rounded px-2 py-1 mr-2"
          value={familyDiscount.type}
          onChange={(e) =>
            setFamilyDiscount((fd) => ({ ...fd, type: e.target.value }))
          }
        >
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed Amount</option>
        </select>
        <input
          type="number"
          className="border rounded px-2 py-1 mr-2"
          value={familyDiscount.amount}
          min={0}
          step={0.01}
          onChange={(e) =>
            setFamilyDiscount((fd) => ({
              ...fd,
              amount: parseFloat(e.target.value),
            }))
          }
          placeholder={familyDiscount.type === "percentage" ? "%" : "$"}
        />
        <input
          type="number"
          className="border rounded px-2 py-1"
          value={familyDiscount.studentThreshold}
          min={1}
          step={1}
          onChange={(e) =>
            setFamilyDiscount((fd) => ({
              ...fd,
              studentThreshold: parseInt(e.target.value),
            }))
          }
          placeholder="Student Threshold"
        />
      </div>
      <div className="mb-3 flex gap-4">
        <div>
          <label className="block font-semibold mb-1">Max Per Student</label>
          <input
            type="number"
            className="border rounded px-2 py-1"
            value={maxPerStudent ?? ""}
            min={0}
            step={0.01}
            onChange={(e) => setMaxPerStudent(parseFloat(e.target.value))}
            placeholder="$300"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Max Per Family</label>
          <input
            type="number"
            className="border rounded px-2 py-1"
            value={maxPerFamily ?? ""}
            min={0}
            step={0.01}
            onChange={(e) => setMaxPerFamily(parseFloat(e.target.value))}
            placeholder="$600"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Tuition Rate
      </button>
    </form>
  );
};

export default TuitionForm;
