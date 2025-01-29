import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../components/common/Table";
import Pagination from "../components/common/Pagination";
import { columns } from "../constants/profile.constant";
import { getProfile } from "../services/auth.service";
import { Button, Modal } from "../components/common";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePagination from "../hooks/usePagination";
import useAxiosLoader from "../hooks/useAxiosLoader";
import { showAlert } from "../store/alertSlice";
import AddRecipeForm from "../components/recipe/AddRecipe";

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

  const dispatch = useDispatch();

  const handleShowModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getProfile(_id);
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
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <>
      <div className="mt-20 mx-2">
        <Table columns={columns} data={data} title={"My Recipes"} />
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
      <div>
        <Modal
          modalOpen={open}
          setModalOpen={setOpen}
          cstmStyle="w-full max-w-2xl"
        >
          <AddRecipeForm />
        </Modal>
      </div>
    </>
  );
}

/*
  <Profile /> 
  - selectedId
  - Form (has state and the logic)
  - if selectedId is not null, then show the form for creating a new recipe
  - else show the table of recipes

  - title
  - description
  - ingridents 
  - steps (dynamic)
  - image review

  send as form data

*/
export default Profile;
