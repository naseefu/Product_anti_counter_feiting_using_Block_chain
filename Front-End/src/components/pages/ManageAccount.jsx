import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import bgImg from '../../img/bg12.jpg';

const columns = [
    { field: 'name', headerName: 'Name', width: 120, editable: true },
    { field: 'description', headerName: 'Description', width: 300, editable: true },
    { field: 'username', headerName: 'Username', width: 130, editable: true },
    { field: 'website', headerName: 'Website', width: 200, editable: true },
    { field: 'location', headerName: 'Location', width: 200, editable: true },
    { field: 'role', headerName: 'Role', width: 130, editable: true },
    { field: 'image', headerName: 'Image', width: 130 },
    {
        field: 'rating',
        headerName: 'Rating',
        width: 130,
        renderCell: (params) => (
            <Rating name={`rating-${params.row.id}`} value={params.row.rating} readOnly />
        ),
    },
];

const ManageAccount = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        handleData();
    }, []);

    const handleData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/profileAll');
            const data = await Promise.all(res.data.map(async (row) => ({
                ...row,
                rating: row.role === 'retailer' ? await calculateAverageRating(row.name) : undefined,
            })));
            setRows(data);
            return data; // Return the updated data
        } catch (error) {
            console.error(error);
        }
    };

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1)
    }

    const calculateAverageRating = async (username) => {
        try {
            const res = await axios.get(`http://localhost:5000/average-rating/${username}`);
            return res.data.avg_rating; // assuming the response is like { "avg_rating": 4.5 }
        } catch (error) {
            console.error(error);
            return 0; // Default to 0 if there are no ratings or an error occurs
        }
    };

    return (
        <Box sx={{ 
            backgroundImage: `url(${bgImg})`, // Update the path to your image
            backgroundSize:'cover',
            display: 'flex',
            flexDirection: 'column',  
            alignItems: 'center',
            justifyContent: 'space-around',
            height: '100vh',
            width: '100vw',
            backgroundPosition: 'center',
        }}>
            <Paper elevation={3} sx={{ width: '80%', margin: 'auto', padding: '3%', backgroundColor: '#f8f8f8' }}>
                <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '3%', fontWeight: 'bold' }}>
                    Manage Account
                </Typography>
                <Paper sx={{ height: 400, width: '100%', backgroundColor: '#ffffff' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
                </Paper>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
                    <Button variant="outlined" onClick={handleBack}>
                        Back
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default ManageAccount;
