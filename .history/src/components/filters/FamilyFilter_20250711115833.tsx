import React from "react";

interface Family {
  id: string;
  name: string;
}

interface Props {
  families: Family[];
  value: string;
  onChange: (familyId: string) => void;
}

const FamilyFilter: React.FC<Props> = ({ families, value, onChange }) => (
  <select
    className="border rounded px-2 py-1 bg-white text-gray-700"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="">All Families</option>
    {families.map((fam) => (
      <option key={fam.id} value={fam.id}>
        {fam.name}
      </option>
    ))}
  </select>
);

export default FamilyFilter;
