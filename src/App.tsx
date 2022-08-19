import './App.css';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

const App = () => {
    return (
        <Container maxWidth="sm">
            <Paper sx={{ marginTop: '16px' }}>
                <Outlet/>
            </Paper>
        </Container>
    );
}

export default App;
