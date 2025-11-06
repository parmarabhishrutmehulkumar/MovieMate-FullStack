import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Typography,
    TextField,
    Button,
    Alert,
    Card,
    CardContent,
    Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: "url('https://media.istockphoto.com/id/181613506/photo/abstract-multimedia-background.jpg?s=612x612&w=0&k=20&c=DN5lgITX4wGrAINvEoboG-OZa7j-FZjXom1PEFzyEP8=')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    maxWidth: '500px',
    width: '100%',
}));

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleRegister = async (event) => {
        event.preventDefault();
        setError(""); // Clear previous errors

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post("https://moviemate-backend-sii2.onrender.com/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            if (response.status === 201) {
                setSuccessMessage("Successfully Registered!");
                setTimeout(() => navigate("/login"), 1500); // Redirect after 1.5s
            }
        } catch (err) {
            setError(
                err.response?.data?.message || "Something went wrong. Please try again."
            );
        }
    };

    return (
        <StyledContainer>
            <StyledCard>
                <CardContent>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{ color: '#aaa', fontWeight: 'bold' }}
                    >
                        Create Your Account
                    </Typography>

                    {successMessage && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {successMessage}
                        </Alert>
                    )}
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleRegister}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Your Name"
                                    variant="outlined"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    sx={{
                                        backgroundColor: "#121212",
                                        color: "#f8f9fa",
                                        input: { color: '#f8f9fa' },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Your Email"
                                    type="email"
                                    variant="outlined"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    sx={{
                                        backgroundColor: "#121212",
                                        color: "#f8f9fa",
                                        input: { color: '#f8f9fa' },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    sx={{
                                        backgroundColor: "#121212",
                                        color: "#f8f9fa",
                                        input: { color: '#f8f9fa' },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Confirm Password"
                                    type="password"
                                    variant="outlined"
                                    value={formData.confirmPassword}
                                    onChange={(e) =>
                                        setFormData({ ...formData, confirmPassword: e.target.value })
                                    }
                                    sx={{
                                        backgroundColor: "#121212",
                                        color: "#f8f9fa",
                                        input: { color: '#f8f9fa' },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        background: "linear-gradient(to right, #b31217, #e52d27)",
                                        boxShadow: "0 4px 10px rgba(229, 45, 39, 0.6)",
                                    }}
                                >
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                        <Typography
                            align="center"
                            sx={{ mt: 3, color: '#bbb' }}
                        >
                            Already have an account?{" "}
                            <Link to="/login" style={{ color: "#f8d32d", textDecoration: "none" }}>
                                Login here
                            </Link>
                        </Typography>
                    </form>
                </CardContent>
            </StyledCard>
        </StyledContainer>
    );
};

export default Register;