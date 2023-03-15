import React from "react";
import {Routes, Route} from "react-router-dom";
import DashboardLayout from "./containers/dashboardLayout";
import DefaultPage from "./pages/defaultPage";
import Users from "./pages/users";
import NotFound from "./pages/notFound"

const App:React.FC = () => {
    return (
        <Routes>
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index/* index - батьківський елемент(route) означає той шо на початку буде*/ element={<DefaultPage />} />
                <Route path="users" element={<Users />}/>

            </Route>
            {/* 👇️ only match this when no other routes match. THIS * is like else in code */}
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    )
}

export default App;