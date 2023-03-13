import React from "react";
import {Routes, Route} from "react-router-dom";
import DashboardLayout from "./containers/dashboardLayout";
import DefaultPage from "./pages/defaultPage";
import Users from "./pages/users";

const App:React.FC = () => {
    return (
        <Routes>
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index/* index - батьківський елемент(route) означає той шо на початку буде*/ element={<DefaultPage />} />
                <Route path="users" element={<Users />}/>
            </Route>
        </Routes>
    )
}

export default App;