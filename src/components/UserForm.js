import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import "./UserForm.scss"; // Impor file SCSS khusus untuk UserForm

const UserForm = ({ editIndex, setEditIndex }) => {
    const { users, addUser, updateUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        umur: "",
        status: "aktif",
    });

    // Update state form jika sedang edit data
    useEffect(() => {
        if (editIndex !== null) {
            setFormData(users[editIndex]);
        }
    }, [editIndex, users]);

    // Handler untuk input form
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validasi data form
    const isValid = () => {
        const { nama, email, umur } = formData;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!nama || !emailPattern.test(email) || umur <= 0) {
            alert("Data tidak valid!");
            return false;
        }
        return true;
    };

    // Handler submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid()) return;

        if (editIndex === null) {
            addUser(formData);
        } else {
            updateUser(editIndex, formData);
            setEditIndex(null);
        }

        setFormData({ nama: "", email: "", umur: "", status: "aktif" });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h3>{editIndex !== null ? "Edit Pengguna" : "Tambah Pengguna"}</h3>
            <input type="text" name="nama" placeholder="Nama" value={formData.nama} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="number" name="umur" placeholder="Umur" value={formData.umur} onChange={handleChange} />
            <select name="status" value={formData.status} onChange={handleChange}>
                <option value="aktif">Aktif</option>
                <option value="tidak_aktif">Tidak Aktif</option>
            </select>
            <button type="submit">Simpan</button>
        </form>
    );
};

export default UserForm;
