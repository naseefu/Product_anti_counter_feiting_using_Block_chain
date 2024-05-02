import { Box, Paper, Avatar, Typography, Button } from '@mui/material';
import bgImg from '../../img/bg12.jpg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [role, setRole] = useState('');
    const [website, setWebsite] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState({
        file: [],
        filepreview: null
    });

    const { auth } = useAuth()
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    const handleData = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/profile/${auth.user}`);
            const userData = res.data[0];
            setName(userData.name);
            setDescription(userData.description);
            setRole(userData.role);
            setWebsite(userData.website);
            setLocation(userData.location);
            // setImage(userData.image);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    useEffect(() => {
        handleData();
    }, []);

    return (
        <Box sx={{
            backgroundImage: `url(${bgImg})`,
            minHeight: "100vh",
            backgroundRepeat: "no-repeat",
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: 'cover',
            zIndex: -2,
            overflowY: "scroll",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Paper elevation={3} sx={{
                width: "60%", 
                padding: "3%", 
                backgroundColor: "#fff",
                borderRadius: '10px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
            }}>
                <Avatar
                    sx={{
                        width: 100,
                        height: 100,
                        margin: "auto",
                        marginBottom: "3%",
                        backgroundColor: "#3f51b5"
                    }}
                >
                    {name[0]}
                </Avatar>

                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center", marginBottom: "2%",
                        color: "#3f51b5",
                        fontWeight: 'bold'
                    }}
                >
                    {name}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center", marginBottom: "2%",
                    }}
                >
                    <strong>Description:</strong> {description}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center", marginBottom: "2%",
                    }}
                >
                    <strong>Role:</strong> {role}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center", marginBottom: "2%",
                    }}
                >
                    <strong>Website:</strong> {website}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center", marginBottom: "2%",
                    }}
                >
                    <strong>Location:</strong> {location}
                </Typography>

                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: '3%'
                    }}
                >
                    <Button
                        onClick={handleBack}
                        sx={{
                            backgroundColor: "#3f51b5",
                            color: "#fff",
                            '&:hover': {
                                backgroundColor: "#32408f",
                            }
                        }}
                    >
                        Back
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default Profile;
