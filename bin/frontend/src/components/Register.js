import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import evImage from '../assets/ev.png'

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [region, setRegion] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== retypePassword) {
            alert('Passwords do not match!');
            return;
        }
        try {
            console.log('Sending registration request with data:', {
                firstName,
                lastName,
                dateOfBirth,
                email,
                password,
                region,
                role,
            });

            const response = await axios.post('http://localhost:8080/api/register', {
                firstName,
                lastName,
                dateOfBirth,
                email,
                password,
                region,
                role,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Registration successful:', response.data);
            navigate('/login'); // Redirect to login after registration
        } catch (error) {
            if (error.response) {
                console.error('Registration failed:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleRegister} style={styles.form}>
            <h2 style={styles.title}>Electric Vehicle Store Registration</h2>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Date of Birth:</label>
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Retype Password:</label>
                    <input
                        type="password"
                        value={retypePassword}
                        onChange={(e) => setRetypePassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Region:</label>
                    <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        style={styles.input}
                        required
                    >
                        <option value="">Select Region</option>
                        <option value="North America">North America</option>
                        <option value="South America">South America</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia">Asia</option>
                        <option value="Africa">Africa</option>
                        <option value="Australia">Australia</option>
                    </select>
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Role:</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={styles.input}
                        required
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" style={styles.button}>Register</button>
                <button onClick={() => navigate('/login')} style={styles.backButton}>Back to Login</button>
            </form>
        </div>
    );
};

export default Register;

// Styles
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Full viewport height
        backgroundColor: '#e6f7ff', // Light blue background
        backgroundImage: `url(${evImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '600px',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    inputGroup: {
        marginBottom: '15px',
        width: '100%',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        color: 'black',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        boxSizing: 'border-box', // preventing overflow
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    backButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#6a6c6c',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
    },
};