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
    const { id } = useParams<{ id: string }>();
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
        id: undefined,
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
            await EditUser(formValues.id!, formValues);
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
            console.error(error); // Handle error here
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
                    console.error(error); // Handle error here
                });
        }
    };

    useEffect(() => {
        if (id) {
            getDetailUser();
            setFormValues((prevFormValues) => ({ ...prevFormValues, id: parseInt(id, 10) }));
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
                                    {Object.entries(formValues).map(([fieldName, fieldValue]) => (
                                        <div key={fieldName}>
                                            <div className="mb-2 block">
                                                <Label htmlFor={fieldName} value={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} />
                                            </div>
                                            <TextInput
                                                id={fieldName}
                                                name={fieldName}
                                                type="text"
                                                placeholder={`Enter ${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`}
                                                value={fieldValue}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    ))}
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
