import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import evImage from '../assets/ev.png'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Clear previous errors
        try {
            const response = await axios.post('http://localhost:8080/api/login', { email, password });

            // Save token in localStorage
            if (response.data) {
                console.log('Login successful:', response.data);
                localStorage.setItem("token", response.data); // Store token
				
				// Decode JWT to extract roles
				const decoded = jwtDecode(response.data);
				console.log("Decoded JWT:", decoded);

				const roles = decoded.roles || [];
				if (roles.includes("ROLE_ADMIN")) {
				    navigate('/admindashboard');
                    console.log("admin here...");
				} else {
				    navigate('/vehiclefilter');
				}
            } else {
                setErrorMessage("No token received. Try again.");
            }
        } catch (error) {
            if (error.response) {
                console.error('Login failed:', error.response.data);
                setErrorMessage(error.response.data.message || "Invalid credentials");
            } else {
                console.error('Login failed:', error.message);
                setErrorMessage("Network error. Try again.");
            }
        }
    };

    const handleGuestLogin = () => {
        console.log("Guest login initiated");
        navigate('/vehiclefilter'); // Redirect guest users
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h2 style={styles.title}>EV Store Project 4413</h2>
                
                {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

                <form onSubmit={handleLogin} style={styles.form}>
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
                    <button type="submit" style={styles.button}>Login</button>
                </form>

                {/* Registration Button */}
                <button onClick={() => navigate('/register')} style={styles.button}>
                    Sign Up
                </button>

                {/*  Continue as Guest Button */}
                <button onClick={handleGuestLogin} style={styles.guestButton}>
                    Continue as Guest
                </button>
            </div>
        </div>
    );
};

export default Login;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: `url(${evImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
    },
    content: {
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '600px',  // Limiting the width of the form container
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box',  // Ensuring padding doesn't affect width calculation
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        color: 'black',
        textAlign: 'center',
    },
    errorMessage: {
        color: 'red',
        fontSize: '14px',
        marginBottom: '10px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    inputGroup: {
        marginBottom: '15px',
        width: '100%',  // Ensuring input group takes full width
        boxSizing: 'border-box',  // Prevent overflow by including padding in width calculation
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        boxSizing: 'border-box',  // Prevent input overflow
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
    guestButton: {
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
