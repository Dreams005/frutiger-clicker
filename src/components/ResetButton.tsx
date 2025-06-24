import React from "react";
import "../css/ResetButton.css";

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your progress?")) {
      onReset();
    }
  };

  return (
    <button className="reset-button" onClick={handleReset}>
      Reset Progress
    </button>
  );
};

export default ResetButton;
