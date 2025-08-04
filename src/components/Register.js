import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/register', { name, email, password });
            console.log('Registration successful:', response.data);
            navigate('/login'); // Redirect to login after registration
        } catch (error) {
            console.error('Registration failed:', error.response.data);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <button onClick={() => navigate('/login')}>Back to Login</button>
        </div>
    );
};

export default Register;