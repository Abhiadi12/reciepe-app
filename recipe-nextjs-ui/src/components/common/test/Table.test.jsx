import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { mockColumns, mockData } from "@/mocks/table.mock";
import Table from "../Table";

jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <div data-testid="mock-icon" />,
}));

jest.mock("../../../utils/getTableFields", () => ({
  getTableFields: jest.fn((value) => value?.toString() || ""),
}));

describe("Table Component", () => {
  const mockHandleChangeSelectedData = jest.fn();

  const defaultProps = {
    columns: mockColumns,
    data: mockData,
    title: "Test Table",
    handleChangeSelectedData: mockHandleChangeSelectedData,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders table with correct title", () => {
    render(<Table {...defaultProps} />);
    expect(screen.getByText("Test Table")).toBeInTheDocument();
  });

  test("renders correct number of columns including actions", () => {
    render(<Table {...defaultProps} />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(mockColumns.length + 1);
  });

  test("renders correct number of columns without actions", () => {
    render(<Table {...defaultProps} showActions={false} />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(mockColumns.length);
  });

  test("renders correct number of rows", () => {
    render(<Table {...defaultProps} />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(mockData.length + 1);
  });

  test("calls handleChangeSelectedData with correct parameters on edit click", () => {
    render(<Table {...defaultProps} />);
    const editButtons = screen.getAllByLabelText("Edit");
    fireEvent.click(editButtons[0]);
    expect(mockHandleChangeSelectedData).toHaveBeenCalledWith("1", "edit");
  });

  test("calls handleChangeSelectedData with correct parameters on delete click", () => {
    render(<Table {...defaultProps} />);
    const deleteButtons = screen.getAllByLabelText("Delete");
    fireEvent.click(deleteButtons[0]);
    expect(mockHandleChangeSelectedData).toHaveBeenCalledWith("1", "delete");
  });

  test("renders table without action buttons when showActions is false", () => {
    render(<Table {...defaultProps} showActions={false} />);
    expect(screen.queryByLabelText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Delete")).not.toBeInTheDocument();
  });

  test("handles empty data array", () => {
    render(<Table {...defaultProps} data={[]} />);
    const rows = screen.getAllByRole("row");
    // Should only have header row
    expect(rows).toHaveLength(1);
  });
});
