import React from "react";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import Modal from "../Modal";

afterEach(() => {
  cleanup();
});

describe("Modal Component", () => {
  // Utility function to create a testable Modal
  const renderModal = (props = {}) => {
    const defaultProps = {
      modalOpen: true,
      setModalOpen: vi.fn(),
      children: <div>Modal Content</div>,
      ...props,
    };

    return render(<Modal {...defaultProps} />);
  };

  it("renders modal when modalOpen is true", () => {
    renderModal();

    // Check if modal is rendered
    const modalDialog = screen.getByRole("dialog");
    expect(modalDialog).toBeInTheDocument();

    // Check if children are rendered
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("does not render modal when modalOpen is false", () => {
    const { container } = render(
      <Modal modalOpen={false} setModalOpen={vi.fn()}>
        Modal Content
      </Modal>
    );

    expect(container.firstChild).toBeNull();
  });

  it("closes modal when close button is clicked", () => {
    const setModalOpen = vi.fn();
    renderModal({ setModalOpen });

    const closeButton = screen.getByTestId("close-modal");
    // debug this closeButton
    fireEvent.click(closeButton);
    expect(setModalOpen).toHaveBeenCalledWith(false);
  });

  it("closes modal when clicking outside the modal content", () => {
    const setModalOpen = vi.fn();
    renderModal({ setModalOpen });

    const overlay = screen.getByRole("dialog").parentElement;
    fireEvent.click(overlay);

    expect(setModalOpen).toHaveBeenCalledWith(false);
  });

  it("applies custom styles when provided", () => {
    renderModal({ cstmStyle: "test-custom-style" });

    const modalContent = screen.getByRole("dialog");
    expect(modalContent.className).toContain("test-custom-style");
  });
});
