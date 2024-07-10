import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import AuthPage from "../pages/AuthPage";
import AdminPage from "../pages/AdminPage";
import NotFound from "../pages/404";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/user";
import Loader from "../components/modules/Loader";

export default function Router(): JSX.Element {
  const { data, isLoading } = useQuery(["profile"], getProfile);
  console.log({ data, isLoading });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="/dashboard"
        element={data ? <DashboardPage /> : <Navigate to={"/auth"} />}
      />
      <Route
        path="/auth"
        element={!data ? <AuthPage /> : <Navigate to={"/dashboard"} />}
      />
      <Route
        path="/admin"
        element={
          data && data.data.role === "ADMIN" ? (
            <AdminPage />
          ) : (
            <Navigate to={"/"} />
          )
        }
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
