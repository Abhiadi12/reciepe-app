import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../Modal";

describe("Modal Component", () => {
  const renderModal = (props = {}) => {
    const defaultProps = {
      modalOpen: true,
      setModalOpen: jest.fn(),
      children: <div>Modal Content</div>,
      ...props,
    };

    return render(<Modal {...defaultProps} />);
  };

  test("renders modal when modalOpen is true", () => {
    renderModal();

    const modalDialog = screen.getByRole("dialog");
    expect(modalDialog).toBeInTheDocument();

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  test("does not render modal when modalOpen is false", () => {
    const { container } = render(
      <Modal modalOpen={false} setModalOpen={jest.fn()}>
        Modal Content
      </Modal>,
    );

    expect(container.firstChild).toBeNull();
  });

  test("closes modal when close button is clicked", () => {
    const setModalOpen = jest.fn();
    renderModal({ setModalOpen });

    const closeButton = screen.getByTestId("close-modal");
    fireEvent.click(closeButton);
    expect(setModalOpen).toHaveBeenCalledWith(false);
  });

  test("closes modal when clicking outside the modal content", () => {
    const setModalOpen = jest.fn();
    renderModal({ setModalOpen });

    const overlay = screen.getByRole("dialog").parentElement;
    fireEvent.click(overlay);

    expect(setModalOpen).toHaveBeenCalledWith(false);
  });

  test("applies custom styles when provided", () => {
    renderModal({ cstmStyle: "test-custom-style" });

    const modalContent = screen.getByRole("dialog");
    expect(modalContent.className).toContain("test-custom-style");
  });
});
