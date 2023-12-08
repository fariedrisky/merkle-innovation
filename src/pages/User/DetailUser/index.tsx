import { useEffect, useState } from "react";
import { User, detailUser } from '../../../utils/api';
import { Card, Button } from "flowbite-react"; // Mengganti komponen dari react-bootstrap ke flowbite-react
import { Link } from "react-router-dom";

export const DetailUserPage = () => {
    const url = window.location.pathname;
    const id = Number(url.substring(url.lastIndexOf("/") + 1));
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>(); // Tambahkan tipe pada useState
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [number, setNumber] = useState("");
    const [zipcode, setZipCode] = useState("");

    const getDetailUser = () => {
        setLoading(true);
        detailUser(id)
            .then((response) => {
                setUser(response.data);
                setFirstName(response.data.name.firstname);
                setLastName(response.data.name.lastname);
                setCity(response.data.address.city);
                setNumber(response.data.address.number.toString()); // Mengubah nilai number menjadi string
                setZipCode(response.data.address.zipcode);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getDetailUser();
    }, []);

    return (
        <div>
            <div className="theme">
                <div className="w-75 my-5">
                    <Card>
                        <h3 className="text-center mt-3">Detail Users</h3>
                        <div className="d-flex gap-3 flex-column my-3">
                            {loading ? (
                                <div className="pb-5 px-5 d-flex justify-content-center align-items-center ">
                                    {/* Tidak ada perubahan */}
                                </div>
                            ) : (
                                <div className="pb-5 px-5">
                                    <Card>
                                        <header>Username : {user?.username}</header>
                                        <div>
                                            <p>ID :&nbsp; {user?.id}</p>
                                            <p className="m-0">
                                                <b>Name :</b> &nbsp;
                                                {`${firstName} ${lastName}`}
                                            </p>
                                            <p className="m-0">
                                                <b>Email :</b> &nbsp;
                                                {user?.email}
                                            </p>
                                            <p className="m-0">
                                                <b>Phone Number :</b> &nbsp;
                                                {user?.phone}
                                            </p>
                                            <p>
                                                <b>Address : </b>&nbsp;{`${city}, No: ${number}, ${zipcode} `}
                                            </p>
                                        </div>
                                    </Card>
                                </div>
                            )}
                            {loading ? (
                                ""
                            ) : (
                                <div className="d-flex justify-content-between mx-5 mb-4">
                                    <Link to={`/edit-user/${user?.id}`}>
                                        <Button>Edit</Button>
                                    </Link>
                                    <Link to={`/users`}>
                                        <Button>Back</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
