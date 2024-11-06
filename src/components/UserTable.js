import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const UserTable = ({ setEditIndex }) => {
    const { users, deleteUser } = useContext(UserContext);

    return (
        <table>
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Umur</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                        <td>{user.nama}</td>
                        <td>{user.email}</td>
                        <td>{user.umur}</td>
                        <td>{user.status}</td>
                        <td>
                            <button onClick={() => setEditIndex(index)}>Edit</button>
                            <button onClick={() => deleteUser(index)}>Hapus</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
