import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentForm from "./CommentForm";
import ShimmerComment from "../shimmer/ShimmerComment";
import usePagination from "../../hooks/usePagination";
import CommentCard from "./CommentCard";
import { fetchRecipeComments } from "../../services/comment.service";
import { showAlert } from "../../store/alertSlice";
import { ALERT_TYPE } from "../../constants/alert.constant";
import { useDispatch } from "react-redux";

function CommentBody({ id }) {
  const dispatch = useDispatch();
  const { page, pageSize, handlePageChange } = usePagination(1, 5, 1);
  const [data, setData] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);

  const fetchData = async (resetPage = false) => {
    try {
      const response = await fetchRecipeComments(id, {
        page: resetPage ? 1 : page,
        limit: pageSize,
      });
      const { comments, totalComments } = response.data?.data;

      setData(resetPage ? comments : [...data, ...comments]);
      handlePageChange(resetPage ? 2 : page + 1);

      setHasMore(data.length < totalComments);
    } catch (error) {
      console.error(error);
      dispatch(
        showAlert({
          message: error.response?.data?.message,
          type: ALERT_TYPE.ERROR,
        })
      );
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <CommentForm
        id={id}
        name="comment"
        label="Add Comment"
        placeholder="Add your comment here"
        fetchData={() => fetchData(true)} // Reset comments list after new comment
        className={"flex gap-2"}
      />
      <div>
        <InfiniteScroll
          dataLength={data.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<ShimmerComment />}
        >
          {data.map((comment) => (
            <CommentCard key={comment._id} comment={comment} recipeId={id} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default CommentBody;
