import React from "react";
import Table from "../components/common/Table";
import Pagination from "../components/common/Pagination";

function Profile() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  //const [data, setData] = React.useState([]);

  const columns = [
    { key: "name", title: "Name" },
    { key: "age", title: "Age" },
    { key: "location", title: "Location" },
    { key: "test", title: "Test" },
    { key: "test2", title: "Test2" },
  ];

  const data = [
    {
      name: "Alice",
      age: 25,
      location: "New York",
      test: "test",
      test2: "test2",
    },
    {
      name: "Bob",
      age: 30,
      location: "San Francisco",
      test: "test",
      test2: "test2",
    },
    {
      name: "Charlie",
      age: 35,
      location: "Chicago",
      test: "test",
      test2: "test2",
    },
  ];

  // useEffect(() => {
  //   async function fetchData() {
  // set data
  //}

  return (
    <>
      <Table columns={columns} data={data} title={"User recipe"} />
      <Pagination
        currentPage={page}
        totalPages={pageSize}
        onPageChange={(val) => {
          console.log(val);
          setPage(val);
        }}
      />
    </>
  );
}

export default Profile;
