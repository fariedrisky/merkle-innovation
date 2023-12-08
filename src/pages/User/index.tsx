import React, { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { User, allUser, deleteUser } from '../../utils/api';
import Swal from 'sweetalert2';
import { Button } from 'flowbite-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

export const UserPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    const navigate = useNavigate(); // Inisialisasi useNavigate

    const getAllUser = () => {
        setLoading(true);
        allUser(limit * currentPage)
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    const handleDeleteUser = (id: number, username: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete user: ${username}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(id)
                    .then(() => {
                        Swal.fire('Deleted!', `User ${username} has been deleted.`, 'success');
                        getAllUser();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        });
    };

    useEffect(() => {
        getAllUser();
    }, [currentPage]);

    const columns: TableColumn<User>[] = [
        {
            name: 'ID',
            selector: (row: User) => row.id,
            sortable: true,
        },
        {
            name: 'Details',
            selector: (row: User) => (
                <div>
                    <p><b>ID:</b> {row.id}</p>
                    <p><b>Name:</b> {`${row.name.firstname} ${row.name.lastname}`}</p>
                    <p><b>Email:</b> {row.email}</p>
                    <p><b>Phone Number:</b> {row.phone}</p>
                    <p><b>Address:</b> {`${row.address.city}, No: ${row.address.number}, ${row.address.street}, ${row.address.zipcode}`}</p>
                </div>
            ),
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row: User) => (
                <div>
                    <button
                        onClick={() => handleDeleteUser(row.id, `${row.name.firstname} ${row.name.lastname}`)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
                    >
                        Delete
                    </button>
                    <Link
                        to={`/detail-user/${row.id}`}
                    >
                        <Button>
                            Detail User
                        </Button>
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full">
            <div className="flex justify-between mb-4">
                <Button onClick={() => navigate('/add-user')} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                    Add User
                </Button>
            </div>
            <DataTable
                title="User List"
                columns={columns}
                data={users}
                pagination
                paginationServer
                paginationTotalRows={100}
                paginationPerPage={limit}
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                onChangePage={(page) => setCurrentPage(page)}
                progressPending={loading}
                progressComponent={<h2>Loading...</h2>}
            />
        </div>
    );
};

export default UserPage;
