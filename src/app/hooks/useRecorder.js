import { useEffect, useState } from "react";

async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream);
}

export default function useRecorder() {
  const [audio, setAudio] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (!recorder) {
      if (isRecording) {
        // requestRecorder().then(setRecorder, console.error);
        (async function (){
           try {
            let recorder = await requestRecorder();
            setRecorder(recorder);
          }
          catch (e) {
              alert('Recorder error');
          }
        })()
      }
      return
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } 
    else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = e => {
      setAudio(e.data);
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return [audio, isRecording, startRecording, stopRecording]
};

