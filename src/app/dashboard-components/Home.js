import React from "react";
import { useQuery } from "react-query";
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Total from './Total';
import Orders from './Orders';
import Copyright from "./Copyright";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" value={50} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
}

export default function Home() {
    let getData = async () => {
        let res = await fetch('/data-home', {
                      method: 'GET'
                  })
        return res.json()
    }
    const {data, error, isLoading} = useQuery('home', getData)
    if (!data) {
        
    }
    return (
            <>
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 240,
                    gap: '5%',
                    backgroundColor: 'rgb(17, 24, 39)',
                    color: 'rgb(178, 186, 194)'
                    }}
                >
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <CircularProgressWithLabel value={20} variant="determinate" /> <b style={{paddingLeft: '5px'}}>Usuarios Activados</b>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <CircularProgressWithLabel value={10} variant="determinate" /> <b style={{paddingLeft: '5px'}}>Usuarios Preactivados</b>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <CircularProgressWithLabel value={70} variant="determinate" /> <b style={{paddingLeft: '5px'}}>Usuarios Sin Estado</b>
                    </div>
                </Paper>
                </Grid>
                {/* Recent Total */}
                <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    backgroundColor: 'rgb(17, 24, 39)',
                    color: 'rgb(178, 186, 194)'
                    }}
                >
                    <Total />
                </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                <Paper 
                    sx={{ 
                        p: 2, display: 'flex', 
                        flexDirection: 'column',
                        backgroundColor: 'rgb(17, 24, 39)',
                        color: 'rgb(178, 186, 194)'
                    }}
                >
                    <Orders />
                </Paper>
                </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
            </Container>
    </>
    )
}