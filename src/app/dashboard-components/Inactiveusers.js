import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import styles from '../css/preactiveusers.module.css'
import Skeleton from '@mui/material/Skeleton';
import InActiveUserComponent from './InActiveUserComponent'
import Pagination from '@mui/material/Pagination';
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
export default function Preactiveusers(){
    let [page, setPage] = useState(1);
    let [limit, setLimit] = useState(30);
    let [info, setInfo] = useState('');
    let [openSnack, setOpenSnack] = useState(false);
    let handleChange = (_, value) => {
        console.log(value)
        setPage(value);
    }
    let getData = async ({ queryKey }) => {
        let res = await fetch(`/inactive-users?page=${(queryKey[1])}&limit=${limit}`, {
                      method: 'GET'
                  })
        return res.json()
    }
    const {data, error, isLoading} = useQuery(['inactiveusers', page, limit], getData);
    return (
        <>
            <div className={styles['main-container']}>
                {
                !data ? <Skeleton variant="rectangular" width="100%" height='100%' /> : (
                    <>
                        <Toolbar />
                                    {data['docs'].map((value, index) => {
                                        const labelId = `checkbox-list-label-${value}`;
                                        return (
                                            <div key={index} id={value.identification.id} style={{backgroundColor: '#162f54', width: '100%', maxWidth: '90%', borderRadius: '10px', margin: '15px 0'}}>
                                                <List sx={{position: 'static',  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', bgcolor: 'background.paper',backgroundColor: '#00000075', color: 'rgb(237, 242, 247)'}}>
                                                    <InActiveUserComponent value={value}  index={index} labelId={labelId} setSnack={(open, info) => {
                                                            info ? setInfo(info): null
                                                            setOpenSnack(open);
                                                    }}/>
                                                </List>
                                            </div>
                                        );
                                    })}
                        <div style={{color: '#fff'}}>
                            <Stack spacing={2} sx={{padding: '15px 0'}}>
                                <Pagination count={data.totalPages} page={page} variant="outlined" shape="rounded" onChange={handleChange} />
                            </Stack>
                        </div>
                    </>
                )
                }
                
            </div>
            <Snackbar open={openSnack} >
                <Alert severity={info.severity} sx={{ width: '100%' }}>
                    {info.message}
                </Alert>
            </Snackbar>
        </>
       
        )
}