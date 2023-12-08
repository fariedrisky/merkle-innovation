import React, { useState, useEffect } from "react";
import { detailUser, EditUser } from '../../../utils/api';
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

interface FormValues {
    email: string;
    username: string;
    phone: string;
    password: string;
    firstName: string;
    lastName: string;
    city: string;
    street: string;
    number: string;
    zipCode: string;
    id?: number; // Add id as an optional field
}

export const EditUserPage = () => {
    const { id } = useParams<{ id: string }>(); // Assuming the ID parameter is available in the route
    const [formValues, setFormValues] = useState<FormValues>({
        email: "",
        username: "",
        phone: "",
        password: "",
        firstName: "",
        lastName: "",
        city: "",
        street: "",
        number: "",
        zipCode: "",
        id: undefined, // Initialize id as undefined
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await EditUser(formValues.id!, formValues); // Assuming formValues has an 'id' field for identification
            setLoading(false);
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Success Edit User with ID : ${formValues.id}`,
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                navigate("/users");
            }, 2000);
        } catch (error) {
            setLoading(false);
            // Handle error here
        }
    };

    const getDetailUser = () => {
        if (id) {
            const userId = parseInt(id, 10);
            detailUser(userId)
                .then((response) => {
                    const { data } = response;
                    setFormValues({
                        id: data.id,
                        email: data.email,
                        username: data.username,
                        phone: data.phone,
                        password: data.password,
                        firstName: data.name.firstname,
                        lastName: data.name.lastname,
                        city: data.address.city,
                        street: data.address.street,
                        number: data.address.number.toString(), // Assuming 'number' should be a string in the form
                        zipCode: data.address.zipcode,
                    });
                })
                .catch((error) => {
                    // Handle error here
                });
        }
    };

    useEffect(() => {
        if (id) {
            getDetailUser();
            setFormValues({ ...formValues, id: parseInt(id, 10) }); // Set the id in formValues
        }
    }, [id]);

    return (
        <div className="theme flex justify-center items-center h-full">
            <div className="card my-5 mx-3 w-md-50">
                <div className="card-body p-md-5">
                    <h5 className="card-title text-center">Silahkan Edit Akun Anda</h5>
                    <div className="pe-xl-3 py-3">
                        <Card className="max-w-sm">
                            <form className="flex max-w-md flex-col gap-4" onSubmit={handleEdit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="email" value="Email" />
                                        </div>
                                        <TextInput
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter Email"
                                            value={formValues.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="username" value="Username" />
                                        </div>
                                        <TextInput
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="Enter Username"
                                            value={formValues.username}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="phone" value="Phone Number" />
                                        </div>
                                        <TextInput
                                            id="phone"
                                            name="phone"
                                            type="text"
                                            placeholder="Enter Phone Number"
                                            value={formValues.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="password" value="Password" />
                                        </div>
                                        <TextInput
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Enter Password"
                                            value={formValues.password}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="firstName" value="First Name" />
                                        </div>
                                        <TextInput
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            placeholder="Enter First Name"
                                            value={formValues.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="lastName" value="Last Name" />
                                        </div>
                                        <TextInput
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            placeholder="Enter Last Name"
                                            value={formValues.lastName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="city" value="City" />
                                        </div>
                                        <TextInput
                                            id="city"
                                            name="city"
                                            type="text"
                                            placeholder="Enter City"
                                            value={formValues.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="street" value="Street" />
                                        </div>
                                        <TextInput
                                            id="street"
                                            name="street"
                                            type="text"
                                            placeholder="Enter Street"
                                            value={formValues.street}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="number" value="Number" />
                                        </div>
                                        <TextInput
                                            id="number"
                                            name="number"
                                            type="text"
                                            placeholder="Enter Number"
                                            value={formValues.number}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="zipCode" value="Zip Code" />
                                        </div>
                                        <TextInput
                                            id="zipCode"
                                            name="zipCode"
                                            type="text"
                                            placeholder="Enter Zip Code"
                                            value={formValues.zipCode}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <Button type="submit">
                                    {loading ? (
                                        <div className="d-flex gap-2 justify-content-center align-items-center">
                                            <div className="spinner-border spinner-border-sm text-white" role="status"></div>
                                            <div>Loading . . .</div>
                                        </div>
                                    ) : (
                                        "Submit"
                                    )}
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUserPage;
