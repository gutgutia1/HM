import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

const HeatRegister = (props) => {
    const navigate = useNavigate();

    const [meltingSupervisorFields, setMeltingSupervisorFields] = useState([{ dateRange: [null, null], text: '' }]);

    const [heatNo, setHeatNo] = useState('');
    const [mouldingSupervisorFields, setMouldingSupervisorFields] = useState([{ dateRange: [null, null], text: '' }]);
    const [pouringSupervisorFields, setPouringSupervisorFields] = useState([{ dateRange: [null, null], text: '' }]);
    const [coreSupervisorFields, setCoreSupervisorFields] = useState([{ dateRange: [null, null], text: '' }]);
    const [shiftIncharge, setShiftIncharge] = useState('');
    const [furnaceNo, setFurnaceNo] = useState('');
    const [workerType, setWorkerType] = useState('');
    const [contractorName, setContractorName] = useState('');
    const [sandIncharge, setSandIncharge] = useState('');
    const [metalGrade, setMetalGrade] = useState('');
    const [mouldingSection, setMouldingSection] = useState([{ dateRange: [null, null], text: '' }]);
    const [error, setError] = useState(''); // State variable for displaying error message
    const auth = useSelector((state) => state.auth);
  
    const addMeltingSupervisorFields = () => {
        const newFields = [...meltingSupervisorFields, { dateRange: [null, null], text: '' }];
        setMeltingSupervisorFields(newFields);
    };

    const handleRemoveMeltingSupervisor = (index) => {
        const newFields = [...meltingSupervisorFields];
        newFields.splice(index, 1);
        setMeltingSupervisorFields(newFields);
    };

    const handleMeltingSupervisoChange = (index, key, value) => {
        const newFields = [...meltingSupervisorFields];
        newFields[index][key] = value;
        setMeltingSupervisorFields(newFields);
    };
    //meltingSupervisorFields end


    const addMouldingSupervisorFields = () => {
        const newFields = [...mouldingSupervisorFields, { dateRange: [null, null], text: '' }];
        setMouldingSupervisorFields(newFields);
    };

    const handleRemoveMouldingSupervisor = (index) => {
        const newFields = [...mouldingSupervisorFields];
        newFields.splice(index, 1);
        setMouldingSupervisorFields(newFields);
    };

    const handleMouldingSupervisoChange = (index, key, value) => {
        const newFields = [...mouldingSupervisorFields];
        newFields[index][key] = value;
        setMouldingSupervisorFields(newFields);
    };
    //mouldingSupervisorFields end

    const addPouringSupervisorFields = () => {
        const newFields = [...pouringSupervisorFields, { dateRange: [null, null], text: '' }];
        setPouringSupervisorFields(newFields);
    };

    const handleRemovePouringSupervisor = (index) => {
        const newFields = [...pouringSupervisorFields];
        newFields.splice(index, 1);
        setPouringSupervisorFields(newFields);
    };

    const handlePouringSupervisorChange = (index, key, value) => {
        const newFields = [...pouringSupervisorFields];
        newFields[index][key] = value;
        setPouringSupervisorFields(newFields);
    };
    //pouringSupervisorFields end

    const addCoreSupervisorFields = () => {
        const newFields = [...coreSupervisorFields, { dateRange: [null, null], text: '' }];
        setCoreSupervisorFields(newFields);
    };

    const handleRemoveCoreSupervisor = (index) => {
        const newFields = [...coreSupervisorFields];
        newFields.splice(index, 1);
        setCoreSupervisorFields(newFields);
    };

    const handleCoreSupervisorChange = (index, key, value) => {
        const newFields = [...coreSupervisorFields];
        newFields[index][key] = value;
        setCoreSupervisorFields(newFields);
    };
    //coreSupervisorFields end

    const addMouldingSectionFields = () => {
        const newFields = [...mouldingSection, { dateRange: [null, null], text: '' }];
        setMouldingSection(newFields);
    };

    const handleRemoveMouldingSection = (index) => {
        const newFields = [...mouldingSection];
        newFields.splice(index, 1);
        setMouldingSection(newFields);
    };

    const handleMouldingChange = (index, key, value) => {
        const newFields = [...mouldingSection];
        newFields[index][key] = value;
        setMouldingSection(newFields);
    };
    //coreSupervisorFields end

    const handleSubmit = async (event) => {
        event.preventDefault();
        // navigate('/ItemRegister')
        try {
            const response = await axios.post('http://localhost:4000/api/v1/opone/registerHeat', {
                headers: {
                    "Authorization": `Bearer ${auth?.token}`, 'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }, {
                "inputDate": "2023-02-2",
                "heatNo": heatNo,
                "meltingSupervisor": [
                    "a",
                    "b"
                ],
                "mouldingSupervisor": [
                    "a",
                    "b"
                ],
                "pouringSupervisor": [
                    "a",
                    "b"
                ],
                "coreSupervisor": [
                    "a",
                    "b"
                ],
                "shiftIncharge": "a",
                "furnaceNo": 1,
                "workerType": "Company",
                "contractorName": "",
                "sandIncharge": "c",
                "metalGrade": "a",
                "mouldingSection": [
                    "a",
                    "b"
                ]
            });

            if (response.status === 200) {
                // history('/HeatRegister')
                // navigate('/HeatRegister')
                // history.push('/HeatRegister');
                console.log('response.headers', response);
                const setCookieHeader = response.headers['set-cookie'];
                if (setCookieHeader) {
                    // Split the cookie header if there are multiple cookies
                    const cookies = setCookieHeader.split(', ');
                    console.log('Cookie:', cookies);

                    // Now you can access and parse individual cookies
                    cookies.forEach(cookie => {
                        console.log('Cookie:', cookie);
                    });
                } else {
                    console.log('blank');
                }
            } else {
                // Login failed, display an error message
                setError(response.data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
            setError(error.message)
        }
    };
    return (
        <form onSubmit={handleSubmit}>
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
                            Heat registration
                        </Typography>

                        <Box>
                            <DatePicker sx={{ width: 400 }} />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="heatNo"
                                label="heatNo"
                                name="heatNo"
                                autoFocus
                                value={heatNo}
                                onChange={(e) => setHeatNo(e.target.value)}

                            />
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                                <Typography component="h1" variant="h5" >Melting Supervisor</Typography >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    title="Add Melting Supervisor"
                                    startIcon={<AddIcon />}
                                    onClick={addMeltingSupervisorFields}
                                    size="small"
                                />
                            </div>

                            {meltingSupervisorFields.map((field, index) => (
                                <div key={index} style={{ marginBottom: 5 }}>

                                    <TextField
                                        margin='normal'
                                        fullWidth
                                        label="meltingSupervisor"
                                        value={field.text}
                                        onChange={(e) => handleMeltingSupervisoChange(index, 'text', e.target.value)}
                                    />
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleRemoveMeltingSupervisor(index)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ))}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                                <Typography component="h1" variant="h5">Moulding Supervisor</Typography >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    title="Add Melting Supervisor"
                                    startIcon={<AddIcon />}
                                    onClick={addMouldingSupervisorFields}
                                    size="small"
                                />
                            </div>
                            {mouldingSupervisorFields.map((field, index) => (
                                <div key={index}>
                                    <TextField
                                        fullWidth
                                        margin='normal'
                                        label="mouldingSupervisor"
                                        value={field.text}
                                        onChange={(e) => handleMouldingSupervisoChange(index, 'text', e.target.value)}
                                    />
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleRemoveMouldingSupervisor(index)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ))}

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                                <Typography component="h1" variant="h5">Pouring Supervisor</Typography >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    title="Add Melting Supervisor"
                                    startIcon={<AddIcon />}
                                    onClick={addPouringSupervisorFields}
                                    size="small"
                                />
                            </div>
                            {pouringSupervisorFields.map((field, index) => (
                                <div key={index}>
                                    <TextField
                                        fullWidth
                                        margin='normal'
                                        label="pouringSupervisor"
                                        value={field.text}
                                        onChange={(e) => handlePouringSupervisorChange(index, 'text', e.target.value)}
                                    />
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleRemovePouringSupervisor(index)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ))}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                                <Typography component="h1" variant="h5">Core Supervisor</Typography >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    title="Add Melting Supervisor"
                                    startIcon={<AddIcon />}
                                    onClick={addCoreSupervisorFields}
                                    size="small"
                                />
                            </div>
                            {coreSupervisorFields.map((field, index) => (
                                <div key={index}>
                                    <TextField
                                        fullWidth
                                        margin='normal'
                                        label="coreSupervisor"
                                        value={field.text}
                                        onChange={(e) => handleCoreSupervisorChange(index, 'text', e.target.value)}
                                    />
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleRemoveCoreSupervisor(index)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ))}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="shiftIncharge"
                                label="shiftIncharge"
                                name="shiftIncharge"
                                autoFocus
                                value={shiftIncharge}
                                onChange={(e) => setShiftIncharge(e.target.value)}

                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="furnaceNo"
                                label="furnaceNo"
                                name="furnaceNo"
                                autoComplete="furnaceNo"
                                autoFocus
                                value={furnaceNo}
                                onChange={(e) => setFurnaceNo(e.target.value)}

                            />

                            <TextField
                                margin="normal"

                                fullWidth
                                id="workerType"
                                label="workerType"
                                name="workerType"
                                autoFocus
                                value={workerType}
                                onChange={(e) => setWorkerType(e.target.value)}

                            />   <TextField
                                margin="normal"

                                fullWidth
                                id="contractorName"
                                label="contractorName"
                                name="contractorName"
                                autoFocus
                                value={contractorName}
                                onChange={(e) => setContractorName(e.target.value)}

                            />   <TextField
                                margin="normal"

                                fullWidth
                                id="sandIncharge"
                                label="sandIncharge"
                                name="sandIncharge"
                                autoComplete="sandIncharge"
                                autoFocus
                                value={sandIncharge}
                                onChange={(e) => setSandIncharge(e.target.value)}

                            />   <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="metalGrade"
                                label="metalGrade"
                                name="metalGrade"
                                autoFocus
                                value={metalGrade}
                                onChange={(e) => setMetalGrade(e.target.value)}
                            />
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                                <Typography component="h1" variant="h5">Moulding Section</Typography >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    title="Add Moulding Section"
                                    startIcon={<AddIcon />}
                                    onClick={addMouldingSectionFields}
                                    size="small"
                                />
                            </div>
                            {mouldingSection.map((field, index) => (
                                <div key={index}>

                                    <TextField
                                        fullWidth
                                        label="mouldingSection"
                                        value={mouldingSection.text}
                                        onChange={(e) => handleMouldingChange(index, 'text', e.target.value)}
                                        margin='normal'
                                    />
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleRemoveMouldingSection(index)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ))}
                            {error && (
                                <Typography variant="body2" color="error">
                                    {error}
                                </Typography>
                            )}
                            <Button variant="contained" type='submit' style={{ marginBottom: 8 }} >
                                Submit
                            </Button>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                                <Button variant="outlined" onClick={() => { navigate('/LogRegister') }} >
                                    Go to Log Register
                                </Button>
                                <Button variant="outlined" onClick={() => { navigate('/ItemRegister') }}>
                                    Go to Item register
                                </Button>
                            </div>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </form>
    );
}

export default HeatRegister;
