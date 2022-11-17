import React, { useRef, useState } from 'react';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { BlobProvider } from '@react-pdf/renderer';
import Doc from './Doc';
import Promissorynote from './Promissorynote';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import styles from '../css/render.module.css'

export default function RenderDocuments() {
    return (
      <>
        <BlobProvider document={<Doc />}>
            {({ blob, url, loading, error }) => {
              if (url) {
                return (
                  <>
                    <div className={styles['pdf-container']}>
                      <Worker workerUrl="./js/pdf.worker.min.js">
                        <Viewer fileUrl={url}/>
                      </Worker>
                    </div>
                  </>
                )
              }
            }}
        </BlobProvider>
        <BlobProvider document={<Promissorynote />}>
            {({ blob, url, loading, error }) => {
              if (url) {
                return (
                  <>
                    <div className={styles['pdf-container']}>
                      <Worker workerUrl="./js/pdf.worker.min.js">
                        <Viewer fileUrl={url}/>
                      </Worker>
                    </div>
                  </>
                )
              }
            }}
        </BlobProvider>
      </>
    );
}
