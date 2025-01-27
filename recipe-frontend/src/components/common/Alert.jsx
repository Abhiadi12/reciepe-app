import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "../../store/alertSlice";

function Alert () {
  const { message, type } = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  // Automatically hide the alert after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(hideAlert());
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [message, dispatch]);

  if (!message) return null; // Do not render anything if there's no message

  // Alert styles based on type
  const alertStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <div
      className={`fixed top-5 right-5 p-4 rounded shadow-lg ${
        alertStyles[type] || "bg-gray-500 text-white"
      }`}
    >
      {message}
    </div>
  );
};

export default Alert;
