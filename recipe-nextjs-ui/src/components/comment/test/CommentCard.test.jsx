import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import CommentCard from "../CommentCard";
import { deleteComment, updateCommentById } from "@/services/comment.service";
import { showAlert } from "@/store/alertSlice";
import { ALERT_TYPE } from "@/constants/alert.constant";
import { mockComment } from "@/mocks/comment.mock";

jest.mock("@/services/comment.service", () => ({
  deleteComment: jest.fn(),
  updateCommentById: jest.fn(),
}));

jest.mock("@/store/alertSlice", () => ({
  showAlert: jest.fn(),
}));

jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <div>Icon</div>,
}));

jest.mock("@/components/common", () => ({
  Modal: ({ children, modalOpen }) =>
    modalOpen ? <div data-testid="modal">{children}</div> : null,
  Avatar: () => <div>Avatar</div>,
}));

jest.mock("@/utils/isAuthorize", () => ({
  isAuthorize: jest.fn(),
}));

jest.mock("@/components/recipe/DeleteRecipe", () => {
  return function DeleteRecipe({ handleDelete, id }) {
    return (
      <div data-testid="delete-modal">
        <button onClick={() => handleDelete(id)}>Confirm Delete</button>
      </div>
    );
  };
});

jest.mock("../CommentEdit", () => {
  return function CommentEdit({ editedComment, setEditedComment, handleEdit }) {
    return (
      <div data-testid="edit-modal">
        <input
          data-testid="edit-input"
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
        />
        <button onClick={handleEdit}>Save Changes</button>
      </div>
    );
  };
});

describe("CommentCard Component", () => {
  const mockProps = {
    comment: mockComment,
    recipeId: "recipe123",
    filterDeletedComment: jest.fn(),
    updateComment: jest.fn(),
  };

  // Mock Redux store
  const mockStore = {
    getState: () => ({
      auth: {
        user: {
          _id: "user123", // Same as comment user id for authorized tests
        },
      },
    }),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  };

  const renderComponent = (props = mockProps) => {
    return render(
      <Provider store={mockStore}>
        <CommentCard {...props} />
      </Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders comment card with user information", () => {
    renderComponent();

    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByText("Test comment")).toBeInTheDocument();
    expect(
      screen.getByText(new Date(mockComment.createdAt).toLocaleString()),
    ).toBeInTheDocument();
  });

  test("handles unknown user gracefully", () => {
    const commentWithoutUser = {
      ...mockComment,
      user: null,
    };
    renderComponent({ ...mockProps, comment: commentWithoutUser });

    expect(screen.getByText("Unknown User")).toBeInTheDocument();
    expect(screen.getByText("U")).toBeInTheDocument();
  });

  test("shows edit and delete buttons for authorized user", () => {
    require("@/utils/isAuthorize").isAuthorize.mockReturnValue(true);
    renderComponent();

    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  test("hides edit and delete buttons for unauthorized user", () => {
    require("@/utils/isAuthorize").isAuthorize.mockReturnValue(false);
    renderComponent();

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("opens edit modal and handles comment update", async () => {
    require("@/utils/isAuthorize").isAuthorize.mockReturnValue(true);
    updateCommentById.mockResolvedValueOnce({
      data: { message: "Comment updated successfully" },
    });

    renderComponent();

    // Open edit modal
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByTestId("edit-modal")).toBeInTheDocument();

    // Edit comment
    const input = screen.getByTestId("edit-input");
    fireEvent.change(input, { target: { value: "Updated comment" } });

    // Save changes
    fireEvent.click(screen.getByText("Save Changes"));

    await waitFor(() => {
      expect(updateCommentById).toHaveBeenCalledWith("recipe123", "123", {
        comment: "Updated comment",
      });
      expect(mockProps.updateComment).toHaveBeenCalledWith(
        "123",
        "Updated comment",
      );
      expect(showAlert).toHaveBeenCalledWith({
        message: "Comment updated successfully",
        type: ALERT_TYPE.SUCCESS,
      });
    });
  });

  test("handles edit error correctly", async () => {
    require("@/utils/isAuthorize").isAuthorize.mockReturnValue(true);
    const error = {
      response: {
        data: {
          message: "Update failed",
        },
      },
    };
    updateCommentById.mockRejectedValueOnce(error);

    renderComponent();

    // Open edit modal
    fireEvent.click(screen.getAllByRole("button")[0]);

    // Save changes
    fireEvent.click(screen.getByText("Save Changes"));

    await waitFor(() => {
      expect(showAlert).toHaveBeenCalledWith({
        message: "Update failed",
        type: ALERT_TYPE.ERROR,
      });
    });
  });

  test("opens delete modal and handles comment deletion", async () => {
    require("@/utils/isAuthorize").isAuthorize.mockReturnValue(true);
    deleteComment.mockResolvedValueOnce({
      data: { message: "Comment deleted successfully" },
    });

    renderComponent();

    // Open delete modal
    fireEvent.click(screen.getAllByRole("button")[1]);
    expect(screen.getByTestId("delete-modal")).toBeInTheDocument();

    // Confirm deletion
    fireEvent.click(screen.getByText("Confirm Delete"));

    await waitFor(() => {
      expect(deleteComment).toHaveBeenCalledWith("recipe123", "123");
      expect(mockProps.filterDeletedComment).toHaveBeenCalledWith("123");
      expect(showAlert).toHaveBeenCalledWith({
        message: "Comment deleted successfully",
        type: ALERT_TYPE.SUCCESS,
      });
    });
  });

  test("handles delete error correctly", async () => {
    require("@/utils/isAuthorize").isAuthorize.mockReturnValue(true);
    const error = {
      response: {
        data: {
          message: "Delete failed",
        },
      },
    };
    deleteComment.mockRejectedValueOnce(error);

    renderComponent();

    // Open delete modal
    fireEvent.click(screen.getAllByRole("button")[1]);

    // Confirm deletion
    fireEvent.click(screen.getByText("Confirm Delete"));

    await waitFor(() => {
      expect(showAlert).toHaveBeenCalledWith({
        message: "Delete failed",
        type: ALERT_TYPE.ERROR,
      });
    });
  });
});
