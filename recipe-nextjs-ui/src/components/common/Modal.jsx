import React, { useEffect } from "react";

const Modal = ({ modalOpen, setModalOpen, children, cstmStyle = "" }) => {
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) setModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);

    // Prevent body scroll when modal is open
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [modalOpen, setModalOpen]);

  if (!modalOpen) return null;

  // Close modal when clicking overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        className={`relative bg-white rounded-lg shadow-xl max-h-[90vh] overflow-auto ${cstmStyle}`}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={() => setModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
