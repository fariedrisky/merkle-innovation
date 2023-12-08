import React, { useState } from "react";
import { register } from '../../../utils/api';
import { Button, TextInput, Label } from "flowbite-react";
import { useNavigate } from "react-router-dom";
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
}

export const AddUserPage = () => {
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
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        register(formValues)
            .then((response) => {
                setLoading(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Success Add New User with ID : ${response.data.id}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    navigate("/users");
                }, 2000);
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    return (
        <div className="theme">
            <div className="card my-5 mx-3 w-md-50">
                <div className="card-body p-md-5">
                    <h5 className="card-title text-center">Silahkan Register Akun Anda</h5>
                    <div className="pe-xl-3 py-3">
                        <form className="flex max-w-md flex-col gap-4" onSubmit={handleRegister}>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email1" value="Your email" />
                                </div>
                                <TextInput
                                    id="email1"
                                    name="email"
                                    type="email"
                                    placeholder="name@flowbite.com"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            {/* Other form inputs using TextInput, Label components */}
                            {/* Replace these input components with Flowbite components accordingly */}
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
                    </div>
                </div>
            </div>
        </div>
    );
}