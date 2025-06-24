import React from "react";
import "../css/ResetButton.css";

interface ResetButtonProps {
  onReset: () => void;
  className?: string;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset, className }) => {
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your progress?")) {
      onReset();
    }
  };

  return (
    <button className={className} onClick={handleReset}>
      Reset
    </button>
  );
};

export default ResetButton;
