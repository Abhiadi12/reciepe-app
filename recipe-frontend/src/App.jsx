import React from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromChildren } from "react-router-dom";
import { AuthPage, Profile, Home, Layout } from "./pages";
import PrivateRoute from "./components/authentication/PrivateRoute";

const router= createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<Layout/>}>
      <Route path="/" element={<AuthPage />} />
      <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
    </Route>
  )
);



function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
