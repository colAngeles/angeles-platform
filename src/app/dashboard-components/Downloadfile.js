import React from "react";
import { Button } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
export default function Downloadfile () {
    return (
        <div style={{height: "5rem"}} >
            <a href="/download-active-users-csv" style={{textDecoration: 'none'}}>
                <Button style={{margin: '10px'}} variant="outlined" startIcon={<DownloadIcon fontSize="small" />}>
                    Exportar csv
                </Button>
                
            </a>
            <a href="/download-active-users-excel" style={{textDecoration: 'none'}}>
                <Button style={{margin: '10px'}} variant="outlined" startIcon={<DownloadIcon fontSize="small" />}>
                    Exportar Excel
                </Button>
            </a>

        </div>
    )
}