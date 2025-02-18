// CommentBody.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import CommentBody from "../CommentBody";
import { fetchRecipeComments } from "@/services/comment.service";
import { showAlert } from "@/store/alertSlice";

// Mock components
const MockCommentForm = ({ fetchData }) => (
  <div data-testid="comment-form" onClick={fetchData}>
    Mock Comment Form
  </div>
);

const MockCommentCard = ({ comment, filterDeletedComment, updateComment }) => (
  <div data-testid={`comment-card-${comment._id}`}>
    <span>{comment.comment}</span>
    <button onClick={() => filterDeletedComment(comment._id)}>Delete</button>
    <button onClick={() => updateComment(comment._id, "Updated comment")}>
      Update
    </button>
  </div>
);

// Mock the dynamic imports
jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: (dynamicImport) => {
    return function DynamicComponent(props) {
      if (dynamicImport.toString().includes("CommentForm")) {
        return <MockCommentForm {...props} />;
      }
      if (dynamicImport.toString().includes("CommentCard")) {
        return <MockCommentCard {...props} />;
      }
      return null;
    };
  },
}));

jest.mock("react-infinite-scroll-component", () => {
  return function InfiniteScroll({
    children,
    next,
    dataLength,
    hasMore,
    loader,
  }) {
    return (
      <div data-testid="infinite-scroll" onClick={next}>
        {children}
        {hasMore && dataLength > 0 && loader}
      </div>
    );
  };
});

// Mock ShimmerComment
jest.mock("@/components/shimmer/ShimmerComment", () => {
  return function ShimmerComment() {
    return <div data-testid="shimmer">Loading...</div>;
  };
});

jest.mock("@/services/comment.service", () => ({
  fetchRecipeComments: jest.fn(),
}));

jest.mock("@/store/alertSlice", () => ({
  showAlert: jest.fn(),
}));

// Mock usePagination hook
jest.mock("@/hooks/usePagination", () => () => ({
  page: 1,
  pageSize: 5,
  handlePageChange: jest.fn(),
}));

// Mock Redux store
const mockStore = {
  getState: () => ({}),
  dispatch: jest.fn(),
  subscribe: jest.fn(),
};

describe("CommentBody Component", () => {
  const mockComments = [
    { _id: "1", comment: "First comment" },
    { _id: "2", comment: "Second comment" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) => {
    return render(
      <Provider store={mockStore}>
        <CommentBody id="recipe123" {...props} />
      </Provider>,
    );
  };

  test("should fetch and render initial comments", async () => {
    fetchRecipeComments.mockResolvedValueOnce({
      data: {
        data: {
          comments: mockComments,
          totalComments: 2,
        },
      },
    });

    renderComponent();

    // Wait for the fetch to complete
    await waitFor(() => {
      expect(fetchRecipeComments).toHaveBeenCalledWith("recipe123", {
        page: 1,
        limit: 5,
      });
    });

    // Wait for the comments to be rendered
    await waitFor(() => {
      expect(screen.getByTestId("comment-card-1")).toBeInTheDocument();
      expect(screen.getByTestId("comment-card-2")).toBeInTheDocument();
    });
  });

  test("should handle load more comments", async () => {
    const initialComments = [mockComments[0]];
    const nextComments = [mockComments[1]];

    fetchRecipeComments
      .mockResolvedValueOnce({
        data: {
          data: {
            comments: initialComments,
            totalComments: 2,
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          data: {
            comments: nextComments,
            totalComments: 2,
          },
        },
      });

    renderComponent();

    // Wait for initial comments
    await waitFor(() => {
      expect(screen.getByTestId("comment-card-1")).toBeInTheDocument();
    });

    const infiniteScroll = screen.getByTestId("infinite-scroll");
    fireEvent.click(infiniteScroll);

    // Wait for next comments
    await waitFor(() => {
      expect(screen.getByTestId("comment-card-2")).toBeInTheDocument();
    });
  });

  test("should handle error when fetching comments", async () => {
    const error = {
      response: {
        data: {
          message: "Failed to fetch comments",
        },
      },
    };

    fetchRecipeComments.mockRejectedValueOnce(error);

    renderComponent();

    await waitFor(() => {
      expect(showAlert).toHaveBeenCalledWith({
        message: error.response.data.message,
        type: "error",
      });
    });
  });

  test("should filter deleted comment", async () => {
    fetchRecipeComments.mockResolvedValueOnce({
      data: {
        data: {
          comments: mockComments,
          totalComments: 2,
        },
      },
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId("comment-card-1")).toBeInTheDocument();
      expect(screen.getByTestId("comment-card-2")).toBeInTheDocument();
    });

    const deleteButton = screen
      .getByTestId("comment-card-1")
      .querySelector("button");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByTestId("comment-card-1")).not.toBeInTheDocument();
      expect(screen.getByTestId("comment-card-2")).toBeInTheDocument();
    });
  });

  test("should update comment", async () => {
    fetchRecipeComments.mockResolvedValueOnce({
      data: {
        data: {
          comments: mockComments,
          totalComments: 2,
        },
      },
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId("comment-card-1")).toBeInTheDocument();
    });

    const updateButton = screen
      .getByTestId("comment-card-1")
      .querySelectorAll("button")[1];
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(screen.getByText("Updated comment")).toBeInTheDocument();
    });
  });

  test("should reset comments when new comment is added", async () => {
    fetchRecipeComments.mockResolvedValueOnce({
      data: {
        data: {
          comments: mockComments,
          totalComments: 2,
        },
      },
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId("comment-form")).toBeInTheDocument();
    });

    const commentForm = screen.getByTestId("comment-form");
    fireEvent.click(commentForm);

    await waitFor(() => {
      expect(fetchRecipeComments).toHaveBeenCalledWith("recipe123", {
        page: 1,
        limit: 5,
      });
    });
  });
});
