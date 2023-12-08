import { useEffect, useState } from "react";
import { User, detailUser } from '../../../utils/api';
import { Card, Button } from "flowbite-react";
import { Link } from "react-router-dom";

export const DetailUserPage = () => {
    const url = window.location.pathname;
    const id = Number(url.substring(url.lastIndexOf("/") + 1));
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [number, setNumber] = useState("");
    const [zipcode, setZipCode] = useState("");

    const getDetailUser = () => {
        setLoading(true);
        detailUser(id)
            .then((response) => {
                const userData = response.data;
                setUser(userData);
                setFirstName(userData.name.firstname);
                setLastName(userData.name.lastname);
                setCity(userData.address.city);
                setNumber(String(userData.address.number));
                setZipCode(userData.address.zipcode);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getDetailUser();
    }, []);

    return (
        <div className="theme">
            <div className="w-75 my-5">
                <Card>
                    <h3 className="text-center mt-3">Detail Users</h3>
                    <div className="d-flex gap-3 flex-column my-3">
                        {loading ? (
                            <div className="pb-5 px-5 d-flex justify-content-center align-items-center ">
                                {/* Loading Indicator */}
                            </div>
                        ) : (
                            <div className="pb-5 px-5">
                                <Card>
                                    <header>Username: {user?.username}</header>
                                    <div>
                                        <p>ID: {user?.id}</p>
                                        <p className="m-0">
                                            <b>Name:</b> {`${firstName} ${lastName}`}
                                        </p>
                                        <p className="m-0">
                                            <b>Email:</b> {user?.email}
                                        </p>
                                        <p className="m-0">
                                            <b>Phone Number:</b> {user?.phone}
                                        </p>
                                        <p>
                                            <b>Address:</b> {`${city}, No: ${number}, ${zipcode}`}
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        )}
                        {!loading && (
                            <div className="flex justify-between mb-4 p-10">
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
    );
}
