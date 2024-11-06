import React, { useState } from "react";
import { UserProvider } from "./context/UserContext";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";

const App = () => {
    const [editIndex, setEditIndex] = useState(null);

    return (
        <UserProvider>
            <div>
                <h1>Data Pengguna</h1>
                <UserForm editIndex={editIndex} setEditIndex={setEditIndex} />
                <UserTable setEditIndex={setEditIndex} />
            </div>
        </UserProvider>
    );
};

export default App;
