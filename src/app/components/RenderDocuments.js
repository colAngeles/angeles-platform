import React, { useRef, useState } from 'react';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import { BlobProvider } from '@react-pdf/renderer';
import Doc from './Doc';
import Promissorynote from './Promissorynote';
import { Worker, Viewer, ScrollMode } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import styles from '../css/render.module.css'
import Divider from '@mui/material/Divider';
import useIntersect from '../hooks/useIntersect';

export default function RenderDocuments() {
    let [entry, setRoot, seNode] = useIntersect({})
    const zoomPluginInstance = zoomPlugin();
    const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
    return (
      <>
        <Worker workerUrl="./js/pdf.worker.min.js">
        </Worker>
        <div
          style={{
              alignItems: 'center',
              backgroundColor: '#eeeeee',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              display: 'flex',
              justifyContent: 'center',
              padding: '4px',
              position: 'fixed',
              bottom: '1rem',
              right: '1rem',
              borderRadius: '5px',
              zIndex: 1000
          }}
        >
          <ZoomOutButton />
          <ZoomPopover />
          <ZoomInButton />
        </div>

        <BlobProvider document={<Doc />}>
            {({ url }) => {
              if (url) {
                return (
                  <>
                    <div className={styles['pdf-container']}>
                          <Viewer fileUrl={url} plugins={[zoomPluginInstance]}/>
                    </div>
                  </>
                )
              }
            }}
        </BlobProvider>

        <div style={{width: '75vw', margin: '0 auto'}}>
          <Divider component="li" sx={{listStyle: 'none'}}/>
        </div>

        <BlobProvider document={<Promissorynote />}>
            {({ url }) => {
              if (url) {
                return (
                  <>
                    <div className={styles['pdf-container']}>
                        <Viewer fileUrl={url} plugins={[zoomPluginInstance]} />
                    </div>
                  </>
                )
              }
            }}
        </BlobProvider>
      </>
    );
}
