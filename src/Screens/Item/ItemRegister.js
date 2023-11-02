import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
const defaultTheme = createTheme();

export default function ItemRegister() {
    const [itemName, setItem] = useState('');
    const [partNo, setPartNo] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [category, setCategory] = useState('');
    const [boxesMoulded, setBoxesMoulded] = useState('');
    const [cavity, setCavity] = useState('');
    const [boxSize, setBoxSize] = useState('');
    const [heatNo, setHeatNo] = useState('');


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        marginBottom: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h4" marginBottom={5}>
                        Item registration
                    </Typography>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="ItemName"
                        label="ItemName"
                        type="ItemName"
                        id="ItemName"
                        value={itemName}
                        onChange={(e) => setItem(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="PartNo"
                        label="PartNo"
                        type="PartNo"
                        id="PartNo"
                        value={partNo}
                        onChange={(e) => setPartNo(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="CustomerName"
                        label="CustomerName"
                        type="CustomerName"
                        id="CustomerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="Category"
                        label="Category"
                        type="Category"
                        id="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="boxesMoulded"
                        label="boxesMoulded"
                        type="boxesMoulded"
                        id="boxesMoulded"
                        inputMode='numeric'
                        value={boxesMoulded}
                        onChange={(e) => setBoxesMoulded(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="Cavity"
                        label="Cavity"
                        type="Cavity"
                        id="Cavity"
                        value={cavity}
                        onChange={(e) => setCavity(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="BoxSize"
                        label="BoxSize"
                        type="BoxSize"
                        id="BoxSize"
                        value={boxSize}
                        onChange={(e) => setBoxSize(e.target.value)}
                    />
                    <Button variant="outlined" >
                        Delete
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
