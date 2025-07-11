import React, { useState } from "react";
import { postCharges } from "../../firebase/postCharges";

interface Props {
  onPosted: () => void;
}

const PostChargesButton: React.FC<Props> = ({ onPosted }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (
      !window.confirm(
        "This will calculate and post charges for all families for the current month. Continue?"
      )
    ) {
      return;
    }
    setLoading(true);
    try {
      await postCharges();
      alert("Charges have been posted successfully.");
      onPosted();
    } catch (error) {
      alert("Failed to post charges. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2 ${
        loading ? "opacity-60 cursor-not-allowed" : ""
      }`}
      onClick={handleClick}
      disabled={loading}
      type="button"
    >
      <i className="fas fa-file-invoice-dollar"></i>
      {loading ? "Processing..." : "Post Charges"}
    </button>
  );
};

export default PostChargesButton;
