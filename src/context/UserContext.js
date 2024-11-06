import React, { createContext, useState, useEffect } from "react";

// Membuat context
export const UserContext = createContext();

// Membuat provider
export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const apiUrl = "https://api.github.com/users";

    // Fungsi untuk mengambil data dari API GitHub
    const fetchUsers = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Failed to fetch data");
            const data = await response.json();
            setUsers(
                data.map((user) => ({
                    nama: user.login,
                    email: "N/A",
                    umur: 0,
                    status: "aktif"
                }))
            );
        } catch (error) {
            console.error(error);
            alert("Gagal mengambil data dari API.");
        }
    };

    // Fungsi untuk menambahkan pengguna baru
    const addUser = (user) => {
        setUsers((prevUsers) => [...prevUsers, user]);
    };

    // Fungsi untuk mengedit pengguna
    const updateUser = (index, updatedUser) => {
        setUsers((prevUsers) =>
            prevUsers.map((user, i) => (i === index ? updatedUser : user))
        );
    };

    // Fungsi untuk menghapus pengguna
    const deleteUser = (index) => {
        setUsers((prevUsers) => prevUsers.filter((_, i) => i !== index));
    };

    // Mengambil data dari API hanya sekali saat komponen dipasang
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};
