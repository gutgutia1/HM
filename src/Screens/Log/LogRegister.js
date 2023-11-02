import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function LogRegister() {
    const navigate = useNavigate();

    const [liningNo, setLiningNo] = useState('');
    const [liquidMetal, setLiquidMetal] = useState('');
    const [wiReturn, setWiReturn] = useState('');
    const [sgimciReturn, setSgimciReturn] = useState('');
    const [msScrap, setMsScrap] = useState('');
    const [pigIron, setPigIron] = useState('');
    const [greyIron, setGreyIron] = useState('');
    const [mix, setMix] = useState('');

    const [spongeIron, setSpongeIron] = useState('');
    const [totalCharge, setTotalCharge] = useState('');
    const [gfpetCoke, setGfpetCoke] = useState('');
    const [mcr, setMcr] = useState('');
    const [sicFesi, setSicFesi] = useState('');
    const [feMn, setFeMn] = useState('');
    const [feboFeSiMgFesi, setFeboFeSiMgFesi] = useState('');
    const [bismuthMgTreatment, setBismuthMgTreatment] = useState('');


    const [totalLiqMetal, setTotalLiqMetal] = useState('');
    const [metalTapped, setMetalTapped] = useState('');
    const [metalLeftInFurnace, setMetalLeftInFurnace] = useState('');
    const [powerOn, setPowerOn] = useState('');
    const [tappedAt, setTappedAt] = useState('');
    const [pouringEnded, setPouringEnded] = useState('');
    const [totalTime, setTotalTime] = useState('');
    const [kwhConsumed, setKwhConsumed] = useState('');

    const [carbon, setCarbon] = useState('');
    const [silcon, setSilcon] = useState('');
    const [manganese, setManganese] = useState('');
    const [sulphur, setSulphur] = useState('');
    const [pCr, setpCr] = useState('');
    const [phos, setphos] = useState('');
    const [chromium, setchromium] = useState('');
    const [tappingTemp, settappingTemp] = useState('');
    const [lastPouringTemp, setlastPouringTemp] = useState('');
    const [mottleBarTest, setmottleBarTest] = useState('');
    const [melter, setmelter] = useState('');
    const [heatNo, setheatNo] = useState('');


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
                        Log registration
                    </Typography>

                    <TextField
                        margin="normal"

                        fullWidth
                        name="liningNo"
                        label="liningNo"
                        type="liningNo"
                        id="liningNo"
                        value={liningNo}
                        onChange={(e) => setLiningNo(e.target.value)}
                    />

                    <TextField
                        margin="normal"

                        fullWidth
                        name="LiquidMetal"
                        label="LiquidMetal"
                        type="LiquidMetal"
                        id="LiquidMetal"
                        value={liquidMetal}
                        onChange={(e) => setLiquidMetal(e.target.value)}
                    />

                    <TextField
                        margin="normal"

                        fullWidth
                        name="WiReturn"
                        label="WiReturn"
                        type="WiReturn"
                        id="WiReturn"
                        value={wiReturn}
                        onChange={(e) => setWiReturn(e.target.value)}
                    />
                    <TextField
                        margin="normal"

                        fullWidth
                        name="SgimciReturn"
                        label="SgimciReturn"
                        type="SgimciReturn"
                        id="SgimciReturn"
                        value={sgimciReturn}
                        onChange={(e) => setSgimciReturn(e.target.value)}
                    />

                    <TextField
                        margin="normal"

                        fullWidth
                        name="msScrap"
                        label="msScrap"
                        type="msScrap"
                        id="msScrap"
                        inputMode='numeric'
                        value={msScrap}
                        onChange={(e) => setMsScrap(e.target.value)}
                    />

                    <TextField
                        margin="normal"

                        fullWidth
                        name="PigIron"
                        label="PigIron"
                        type="PigIron"
                        id="PigIron"
                        value={pigIron}
                        onChange={(e) => setPigIron(e.target.value)}
                    />
                    <TextField
                        margin="normal"

                        fullWidth
                        name="GreyIron"
                        label="GreyIron"
                        type="GreyIron"
                        id="GreyIron"
                        value={greyIron}
                        onChange={(e) => setGreyIron(e.target.value)}
                    />
                    <TextField
                        margin="normal"

                        fullWidth
                        name="mix"
                        label="mix"
                        type="mix"
                        id="mix"
                        value={mix}
                        onChange={(e) => setMix(e.target.value)}
                    />

                    <TextField
                        margin="normal"

                        fullWidth
                        name="spongeIron"
                        label="spongeIron"
                        type="spongeIron"
                        id="spongeIron"
                        value={spongeIron}
                        onChange={(e) => setSpongeIron(e.target.value)}
                    />

                    <TextField
                        margin="normal"

                        fullWidth
                        name="totalCharge"
                        label="totalCharge"
                        type="totalCharge"
                        id="totalCharge"
                        value={totalCharge}
                        onChange={(e) => setTotalCharge(e.target.value)}
                    />
                    <TextField
                        margin="normal"

                        fullWidth
                        name="gfpetCoke"
                        label="gfpetCoke"
                        type="gfpetCoke"
                        id="gfpetCoke"
                        value={gfpetCoke}
                        onChange={(e) => setGfpetCoke(e.target.value)}
                    />

                    <TextField
                        margin="normal"

                        fullWidth
                        name="mcr"
                        label="mcr"
                        type="mcr"
                        id="mcr"
                        inputMode='numeric'
                        value={mcr}
                        onChange={(e) => setMcr(e.target.value)}
                    />

                    <TextField
                        margin="normal"

                        fullWidth
                        name="sicFesi"
                        label="sicFesi"
                        type="sicFesi"
                        id="sicFesi"
                        value={sicFesi}
                        onChange={(e) => setSicFesi(e.target.value)}
                    />
                    <TextField
                        margin="normal"

                        fullWidth
                        name="feMn"
                        label="feMn"
                        type="feMn"
                        id="feMn"
                        value={feMn}
                        onChange={(e) => setFeMn(e.target.value)}
                    />


                    <TextField
                        margin="normal"

                        fullWidth
                        name="FeboFeSiMgFesi"
                        label="FeboFeSiMgFesi"
                        type="FeboFeSiMgFesi"
                        id="FeboFeSiMgFesi"
                        value={feboFeSiMgFesi}
                        onChange={(e) => setFeboFeSiMgFesi(e.target.value)}
                    />

                    <TextField
                        margin="normal"

                        fullWidth
                        name="bismuthMgTreatment"
                        label="bismuthMgTreatment"
                        type="bismuthMgTreatment"
                        id="bismuthMgTreatment"
                        value={bismuthMgTreatment}
                        onChange={(e) => setBismuthMgTreatment(e.target.value)}
                    />
                    <TextField
                        margin="normal"

                        fullWidth
                        name="totalLiqMetal"
                        label="totalLiqMetal"
                        type="totalLiqMetal"
                        id="totalLiqMetal"
                        value={totalLiqMetal}
                        onChange={(e) => setTotalLiqMetal(e.target.value)}
                    />

                    <TextField
                        margin="normal"

                        fullWidth
                        name="metalTapped"
                        label="metalTapped"
                        type="metalTapped"
                        id="metalTapped"
                        inputMode='numeric'
                        value={metalTapped}
                        onChange={(e) => setMetalTapped(e.target.value)}
                    />

                    <TextField
                        margin="normal"

                        fullWidth
                        name="metalLeftInFurnace"
                        label="metalLeftInFurnace"
                        type="metalLeftInFurnace"
                        id="metalLeftInFurnace"
                        value={metalLeftInFurnace}
                        onChange={(e) => setMetalLeftInFurnace(e.target.value)}
                    />
                    <TextField
                        margin="normal"

                        fullWidth
                        name="powerOn"
                        label="powerOn"
                        type="powerOn"
                        id="powerOn"
                        value={powerOn}
                        onChange={(e) => setPowerOn(e.target.value)}
                    />
                    <TextField
                        margin="normal"

                        fullWidth
                        name="tappedAt"
                        label="tappedAt"
                        type="tappedAt"
                        id="tappedAt"
                        value={tappedAt}
                        onChange={(e) => setTappedAt(e.target.value)}
                    />

                    <TextField
                        margin="normal"

                        fullWidth
                        name="pouringEnded"
                        label="pouringEnded"
                        type="pouringEnded"
                        id="pouringEnded"
                        value={pouringEnded}
                        onChange={(e) => setPouringEnded(e.target.value)}
                    />

                    <TextField
                        margin="normal"

                        fullWidth
                        name="totalTime"
                        label="totalTime"
                        type="totalTime"
                        id="totalTime"
                        value={totalTime}
                        onChange={(e) => setTotalTime(e.target.value)}
                    />
                    <TextField
                        margin="normal"

                        fullWidth
                        name="kwhConsumed"
                        label="kwhConsumed"
                        type="kwhConsumed"
                        id="kwhConsumed"
                        value={kwhConsumed}
                        onChange={(e) => setKwhConsumed(e.target.value)}
                    />

                    <TextField
                        margin="normal"

                        fullWidth
                        name="carbon"
                        label="carbon"
                        type="carbon"
                        id="carbon"
                        inputMode='numeric'
                        value={carbon}
                        onChange={(e) => setCarbon(e.target.value)}
                    />

                    <TextField
                        margin="normal"

                        fullWidth
                        name="silcon"
                        label="silcon"
                        type="silcon"
                        id="silcon"
                        value={silcon}
                        onChange={(e) => setSilcon(e.target.value)}
                    />
                    <TextField
                        margin="normal"

                        fullWidth
                        name="manganese"
                        label="manganese"
                        type="manganese"
                        id="manganese"
                        value={manganese}
                        onChange={(e) => setManganese(e.target.value)}
                    />

                    <TextField
                        margin="normal"

                        fullWidth
                        name="sulphur"
                        label="sulphur"
                        type="sulphur"
                        id="sulphur"
                        inputMode='numeric'
                        value={sulphur}
                        onChange={(e) => setSulphur(e.target.value)}
                    />

                    <TextField
                        margin="normal"

                        fullWidth
                        name="pCr"
                        label="pCr"
                        type="pCr"
                        id="pCr"
                        value={pCr}
                        onChange={(e) => setpCr(e.target.value)}
                    />
                    <TextField
                        margin="normal"

                        fullWidth
                        name="phos"
                        label="phos"
                        type="phos"
                        id="phos"
                        value={phos}
                        onChange={(e) => setphos(e.target.value)}
                    />


                    <TextField
                        margin="normal"

                        fullWidth
                        name="chromium"
                        label="chromium"
                        type="chromium"
                        id="chromium"
                        value={chromium}
                        onChange={(e) => setchromium(e.target.value)}
                    />
                    <TextField
                        margin="normal"

                        fullWidth
                        name="tappingTemp"
                        label="tappingTemp"
                        type="tappingTemp"
                        id="tappingTemp"
                        value={tappingTemp}
                        onChange={(e) => settappingTemp(e.target.value)}
                    />
                    <TextField
                        margin="normal"

                        fullWidth
                        name="lastPouringTemp"
                        label="lastPouringTemp"
                        type="lastPouringTemp"
                        id="lastPouringTemp"
                        value={lastPouringTemp}
                        onChange={(e) => setlastPouringTemp(e.target.value)}
                    />


                    <TextField
                        margin="normal"

                        fullWidth
                        name="mottleBarTest"
                        label="mottleBarTest"
                        type="mottleBarTest"
                        id="mottleBarTest"
                        value={mottleBarTest}
                        onChange={(e) => setmottleBarTest(e.target.value)}
                    />
                    <TextField
                        margin="normal"

                        fullWidth
                        name="melter"
                        label="melter"
                        type="melter"
                        id="melter"
                        value={melter}
                        onChange={(e) => setmelter(e.target.value)}
                    />




                    <Button variant="outlined" onClick={() => { navigate('/ItemRegister') }}>
                        Submit
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
