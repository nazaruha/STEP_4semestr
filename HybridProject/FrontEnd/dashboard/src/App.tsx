import React from "react";
import {Routes, Route} from "react-router-dom";
import SignIn from "./pages/auth/signIn";
import SignUp from "./pages/auth/signUp";
import DashboardLayout from "./containers/dashboardLayout";
import DefaultPage from "./pages/defaultPage";
import Users from "./pages/users";
import NotFound from "./pages/notFound"
import { useTypedSelector } from "./hooks/useTypedSelector";
import EditUser from "./pages/editUser";

const App:React.FC = () => {
    const { isAuth, user } = useTypedSelector(store => store.UserReducer);
    return (
        <Routes>
          {isAuth && (
            <>
              {user.role === "Administrators" && ( // ці роути будуть доступні якщо ти адмін
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<DefaultPage />} />
                  <Route path="users" element={<Users />} />
                  <Route path="sign-up" element={<SignUp />} />
                  <Route path="editUser" element={<EditUser/>}/>
                </Route>
              )}
              {user.role === "Users" && (
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index /* index - батьківський елемент(route) означає той шо на початку буде*/ element={<DefaultPage />} />
                  <Route path="users" element={<Users />} />
                </Route>
              )}
            </>
          )}
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard/" element={<SignIn />} />
          {/* 👇️ only match this when no other routes match. THIS '*' in the 'path' attribute works like 'else' in code */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      );
}

export default App;