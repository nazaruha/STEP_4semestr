import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./containers";
import DefaultPage from "./pages/defaultPage";
import Users from "./pages/users";
import NotFound from "./pages/notFound";
import SignIn from "./pages/auth/singIn";
import SignUp from "./pages/auth/signUp";
import { useTypedSelector } from "./hooks/useTypedSelector";
import Courses from "./pages/courses";
import Categories from "./pages/categories";
import CreateCategory from "./containers/admin/categories/createCategory";
import EditCategory from "./containers/admin/categories/editCategory";
import EditCourse from "./containers/admin/courses/editCourse";
import CreateCourse from "./containers/admin/courses/createCourse";

const App: React.FC = () => {
  const { isAuth, user } = useTypedSelector((store) => store.UserReducer);
  return (
    <Routes>
      {isAuth && (
        <>
          {user.role === "Administrators" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DefaultPage />} />
              <Route path="users" element={<Users />} />
              <Route path="sign-up" element={<SignUp />} />
            </Route>
          )}
          {user.role === "Users" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DefaultPage />} />
              <Route path="users" element={<Users />} />
            </Route>
          )}
        </>
      )}

      <Route path="/" element={<SignIn />} />
      <Route path="/dashboard/" element={<SignIn />} />
      <Route path="/courses">
        <Route index element={<Courses />} />
        {user.role === "Administrators" && (
          <>
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="edit-course" element={<EditCourse />} />
          </>
        )}
      </Route>
      <Route path="/categories">
        <Route index element={<Categories />} />
        {user.role === "Administrators" && (
          <>
            <Route path="create-category" element={<CreateCategory />} />
            <Route path="edit-category" element={<EditCategory />} />
          </>
        )}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
