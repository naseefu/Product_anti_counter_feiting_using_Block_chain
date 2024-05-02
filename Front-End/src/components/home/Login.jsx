import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import bgImg from "../../img/hand-holding-puzzle-piece.jpg";
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { useRef, useState, useEffect } from 'react';

const LOGIN_URL = '/auth';

export default function Login() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleBack = () => {
        navigate('/');
    }

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${LOGIN_URL}/${user}/${pwd}`, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (res.data.length === 0) {
                setErrMsg('Login Failed. Please try again later.');
            } else {
                const role = res.data[0].role;
                setAuth({ user, pwd, role });
                setUser('');
                setPwd('');
                navigate(`/${role}`, { replace: true });

            }
        } catch (err) {
            if (!err.response) {
                setErrMsg('Server is down. Please try again later.');
            } else if (err.response.status === 400) {
                setErrMsg('Invalid username or password.');
            } else if (err.response.status === 401) {
                setErrMsg('Unauthorized access.');
            } else {
                setErrMsg('Login Failed. Please try again later.');
            }
            errRef.current.focus();
        }
    };

    return (
        <Box sx={{
            backgroundImage: `url(${bgImg})`,
            minHeight: "100vh",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 10px",
        }}>

            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        padding: "20px",
                        backgroundColor: '#fff', // Changed login box color
                        color: '#333', // Changed font color
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ textAlign: "center", marginBottom: "20px", fontFamily: 'Roboto', fontWeight: "bold", fontSize: "2rem",color: "#5EBEC4", }}>
                        Forgery Block
                    </Typography>
                    <Typography component="h1" variant="h5" sx={{ textAlign: "center", marginBottom: "20px" }}>
                        Login
                    </Typography>
                    {errMsg && <Typography component="h1" variant="body2" color="error" ref={errRef} sx={{ marginBottom: "20px" }}>  {errMsg} </Typography>}
                    <form onSubmit={handleSubmit} noValidate>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ minWidth: '100px' }}>Username:</Typography>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    name="username"
                                    autoFocus
                                    onChange={(e) => setUser(e.target.value)}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ minWidth: '100px' }}>Password:</Typography>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    type="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                />
                            </Box>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Login
                            </Button>
                            <Box sx={{ textAlign: "center" }}>
                                <RouterLink to="/" style={{ textDecoration: 'none', color: '#3f51b5' }}>Forgot password?</RouterLink>
                            </Box>
                            <Box sx={{ textAlign: "center" }}>
                                <RouterLink to="/" style={{ textDecoration: 'none', color: '#3f51b5' }}>Don't have an account? Sign Up</RouterLink>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Container>
        </Box>
    );
}
