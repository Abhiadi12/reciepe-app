import React, { Suspense } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import { AuthPage, Home, Layout, Test } from "./pages";
import PrivateRoute from "./components/authentication/PrivateRoute";
import Loading from "./components/shimmer/Loading";
import NotFound from "./pages/NotFound";

const ProductDetail = React.lazy(() =>
  import("./components/productDetail/ProductDetail")
);
const Profile = React.lazy(() => import("./pages/Profile"));

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<AuthPage />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <Suspense fallback={<Loading />}>
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          </Suspense>
        }
      />

      <Route
        path="/product/:id"
        element={
          <Suspense fallback={<Loading />}>
            <PrivateRoute>
              <ProductDetail />
            </PrivateRoute>
          </Suspense>
        }
      />
      <Route path="/test" element={<Test />} />
      <Route path="*" element={<NotFound />} />
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
