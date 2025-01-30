import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import usePagination from "../hooks/usePagination";
import useAxiosLoader from "../hooks/useAxiosLoader";
import Table from "../components/common/Table";
import Pagination from "../components/common/Pagination";
import AddRecipeForm from "../components/recipe/AddRecipe";
import EditRecipe from "../components/recipe/EditRecipe";
import useGetProductDetail from "../hooks/useGetProductDetail";
import DeleteRecipe from "../components/recipe/DeleteRecipe";
import { columns } from "../constants/profile.constant";
import { getProfile } from "../services/auth.service";
import { Button, Modal } from "../components/common";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showAlert } from "../store/alertSlice";
import ShimmerTable from "../components/shimmer/ShimmerTable";
import { deleteRecipe } from "../services/recipe.service";

function Profile() {
  const {
    page,
    pageSize,
    totalPages,
    handlePageChange,
    handleTotalPagesChange,
    isDisabled,
  } = usePagination(1, 10, 1);
  const loading = useAxiosLoader();
  const _id = useSelector((state) => state.auth?.user?._id);
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState({
    id: null,
    action: "",
  });
  const { product } = useGetProductDetail(selectedData?.id);

  const dispatch = useDispatch();

  const handleShowModal = () => {
    setOpen(true);
  };

  const handleHideModal = () => {
    setOpen(false);
  };

  const handleChangeSelectedData = (id, action) => {
    setOpen(true);
    setSelectedData({ id, action });
  };

  async function fetchData() {
    try {
      const response = await getProfile(_id, {
        page,
        limit: pageSize,
      });
      const { recipes, totalRecipes } = response.data?.data;

      setData(recipes);
      handleTotalPagesChange(totalRecipes);
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response.data?.message,
          type: ALERT_TYPE.ERROR,
        })
      );
    }
  }

  async function handleDelete(id) {
    try {
      const response = await deleteRecipe(id);
      const message = response.data?.message;
      fetchData();
      handleHideModal();
      dispatch(
        showAlert({
          message,
          type: ALERT_TYPE.SUCCESS,
        })
      );
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response.data?.message,
          type: ALERT_TYPE.ERROR,
        })
      );
    }
  }

  const renderModal = () => {
    if (open && selectedData.id && selectedData.action === "edit") {
      return (
        <Modal
          modalOpen={open}
          setModalOpen={setOpen}
          cstmStyle="w-full max-w-2xl"
        >
          <EditRecipe
            product={product}
            loading={loading}
            handleHideModal={handleHideModal}
            fetchData={fetchData}
          />
        </Modal>
      );
    } else if (open && selectedData.id && selectedData.action === "delete") {
      return (
        <Modal
          modalOpen={open}
          setModalOpen={setOpen}
          cstmStyle="w-full max-w-2xl"
        >
          <DeleteRecipe
            title={"Are you sure"}
            description={"Do you want to delete this recipe?"}
            id={selectedData?.id}
            handleDelete={handleDelete}
          />
        </Modal>
      );
    } else if (selectedData.action === "")
      return (
        <Modal
          modalOpen={open}
          setModalOpen={setOpen}
          cstmStyle="w-full max-w-2xl"
        >
          <AddRecipeForm
            handleHideModal={handleHideModal}
            fetchData={fetchData}
            disbaleButton={loading}
          />
        </Modal>
      );
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  useEffect(() => {
    if (open === false) {
      setSelectedData({ id: null, action: "" });
    }
  }, [open]);

  return (
    <>
      <div className="mt-20 mx-2">
        {loading ? (
          <ShimmerTable />
        ) : (
          <Table
            columns={columns}
            data={data}
            title={"My Recipes"}
            handleChangeSelectedData={handleChangeSelectedData}
          />
        )}
      </div>

      <div>
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalPages / pageSize)}
          onPageChange={handlePageChange}
          isDisabled={isDisabled(page)}
        />
      </div>

      <Button
        onClick={handleShowModal}
        className={"absolute bottom-10 right-10 rounded-full"}
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
      <div>{renderModal()}</div>
    </>
  );
}

export default Profile;
