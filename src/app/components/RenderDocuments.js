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
    const zoom1 = zoomPlugin();
    const zoom2= zoomPlugin();
    const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoom1;
    const { ZoomInButton: ZoomInButton2, ZoomOutButton: ZoomOutButton2, ZoomPopover: ZoomPopover2 } = zoom2;
    return (
      <>
        <Worker workerUrl="./js/pdf.worker.min.js">
        </Worker>
        <div
          style={{
              width: 'max-content',
              margin: '0 auto',
              marginTop: '50px',
              alignItems: 'center',
              backgroundColor: '#eeeeee',
              color: 'red',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              display: 'flex',
              justifyContent: 'center',
              padding: '4px',
              position: 'sticky',
              top: '0',
              borderRadius: '5px',
              zIndex: 1
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
                          <Viewer fileUrl={url} plugins={[zoom1]}/>
                    </div>
                  </>
                )
              }
            }}
        </BlobProvider>
        <div style={{width: '75vw', margin: '0 auto'}}>
          <Divider component="li" sx={{listStyle: 'none'}}/>
        </div>
        <div
          style={{
              width: 'max-content',
              margin: '0 auto',
              marginTop: '50px',
              alignItems: 'center',
              backgroundColor: '#eeeeee',
              color: 'red',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              display: 'flex',
              justifyContent: 'center',
              padding: '4px',
              position: 'sticky',
              top: '0',
              borderRadius: '5px',
              zIndex: 1
          }}
        >
          <ZoomOutButton2 />
          <ZoomPopover2 />
          <ZoomInButton2 />
        </div>
        <BlobProvider document={<Promissorynote />}>
            {({ url }) => {
              if (url) {
                return (
                  <>
                    <div className={styles['pdf-container']}>
                        <Viewer fileUrl={url} plugins={[zoom2]} />
                    </div>
                  </>
                )
              }
            }}
        </BlobProvider>
      </>
    );
}
