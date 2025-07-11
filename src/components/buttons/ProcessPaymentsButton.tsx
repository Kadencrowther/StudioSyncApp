import React, { useState } from "react";
import { processPayments } from "../../firebase/processPayments";

interface Props {
  onProcessed: () => void;
}

const ProcessPaymentsButton: React.FC<Props> = ({ onProcessed }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (
      !window.confirm(
        "This will process payments for all families with auto-pay enabled. Continue?"
      )
    ) {
      return;
    }
    setLoading(true);
    try {
      await processPayments();
      alert("Payments processed successfully.");
      onProcessed();
    } catch (error) {
      alert("Failed to process payments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2 ${
        loading ? "opacity-60 cursor-not-allowed" : ""
      }`}
      onClick={handleClick}
      disabled={loading}
      type="button"
    >
      <i className="fas fa-credit-card"></i>
      {loading ? "Processing..." : "Process Payments"}
    </button>
  );
};

export default ProcessPaymentsButton;
