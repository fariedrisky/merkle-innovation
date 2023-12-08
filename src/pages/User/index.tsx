import { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { User, allUser, deleteUser } from '../../utils/api';
import Swal from 'sweetalert2';
import { Button, Card } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';

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
                console.error('Error fetching users:', error);
                // Lakukan sesuatu dengan error, seperti menampilkan pesan kesalahan kepada pengguna
                setLoading(false); // Tetap atur loading menjadi false setelah menangani kesalahan
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

    const tableCustomStyles = {
        headCells: {
            style: {
                fontSize: '20px',
                fontWeight: 'bold',
                // justifyContent: 'center',
                // backgroundColor: '#0000'
            },
        },
        // cells: {
        //     style: {
        //         fontSize: '20px',
        //         justifyContent: 'center',
        //         // backgroundColor: '#0000'
        //     },
        // },
    };

    const columns: TableColumn<User>[] = [
        {
            name: 'ID',
            cell: (row: User) => (
                <p className='text-lg'>{row.id}</p>
            ),
            sortable: true,
            width: '100px',
        },
        {
            name: 'Details',
            cell: (row: User) => (
                <div>
                    <p className='text-lg'><b>Name:</b> {`${row.name.firstname} ${row.name.lastname}`}</p>
                    <p className='text-lg'><b>Email:</b> {row.email}</p>
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
                        <button className="bg-blue-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2">
                            Detail User
                        </button>
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full">
            <div className="flex justify-between mb-4 p-10">
                <Button onClick={() => navigate('/add-user')}>
                    Add User
                </Button>
                <Button onClick={() => navigate('/login')}>
                    Logout
                </Button>
            </div>
            <div className='flex justify-center items-center'>
                <Card className='w-full max-w-7xl'>
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
                        customStyles={tableCustomStyles}
                    />
                </Card>
            </div>
        </div>
    );
};