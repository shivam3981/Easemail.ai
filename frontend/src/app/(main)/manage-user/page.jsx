'use client';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ManageUser = () => {

    const [UserData, setUserData] = useState([]);

    const fetchUserData = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getall`)
        console.table(res.data);
        setUserData(res.data);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const deleteUser = async (id) => {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/delete/${id}`)
        if (res.status === 200) {
            toast.success("User Deleted Successfully")
            fetchUserData();
        } else {
            toast.error("Failed to delete user")
        }

    };


    return (
        <div>

            <div className='container mx-auto'>
                <h1 className="text-3xl font-bold text-center">Manage Users</h1>

                <table className='w-full border mt-6'>
                    <thead className='bg-gray-400'>
                        <tr>
                            <th className='p-2'>ID</th>
                            <th className='p-2'>Name</th>
                            <th className='p-2'>Email</th>
                            <th className='p-2'>City</th>
                            <th className='p-2'>CreatedAt</th>
                            <th className='p-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            UserData.map((user) => {
                                return (
                                    <tr key={user._id} className='text-center border bg-gray-100'>
                                        <td className='p-2'>{user._id}</td>
                                        <td className='p-2'>{user.name}</td>
                                        <td className='p-2'>{user.email}</td>
                                        <td className='p-2'>{user.city}</td>
                                        <td className='p-2'>{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td className='p-2'>
                                            <button onClick={() => { deleteUser(user._id) }} className='bg-red-500 text-white rounded p-2'>Delete
                                            </button>
                                        </td>
                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default ManageUser; 