import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { login } from '../../utils/api';

const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate(); // Inisialisasi useNavigate

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        const body = { username, password };
        login(body)
            .then((response) => {
                setLoading(false);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login Success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                // Navigate to "/users" after successful login
                navigate('/users'); // Gunakan navigate
                console.log(response.data); // Adjust this according to your login response
            })
            .catch((error) => {
                setLoading(false);
                const message = error.response?.data?.message || 'An error occurred.';
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: message,
                });
                console.error('Login error:', error);
            });
    };

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-1/2 max-w-full">
                <form className="flex max-w-md flex-col gap-4" onSubmit={handleLogin}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="username" value="Your username" />
                        </div>
                        <TextInput
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Your password" />
                        </div>
                        <TextInput
                            id="password1"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Submit'}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;
