import React, { useState } from 'react';
import VisualDemo from "./visualdemo"

const Background = () => {

    const [audioState, setAudioState] = useState([])

    const frequencyBandArray = [...Array(25).keys()]

    const initializeAudioAnalyser = () => {
        const audioFile = new Audio();
        const audioContext = new AudioContext();
        const source = audioContext.createMediaElementSource(audioFile);
        const analyser = audioContext.createAnalyser();
        audioFile.src = document.getElementsByTagName("iframe")[0];
        analyser.fftSize = 64
        source.connect(audioContext.destination);
        source.connect(analyser);
        console.log(analyser);
        // audioFile.play()
        setAudioState(analyser)
    }

    const getFrequencyData = (styleAdjuster) => {
        const bufferLength = audioState.frequencyBinCount;
        const amplitudeArray = new Uint8Array(bufferLength);
        audioState.getByteFrequencyData(amplitudeArray)
        styleAdjuster(amplitudeArray)
    }

    const min = 5;
    const max = 80;
    return(
        <div className="background">
            <div className="theLines">
                <VisualDemo
                    initializeAudioAnalyser={initializeAudioAnalyser}
                    frequencyBandArray={frequencyBandArray}
                    getFrequencyData={getFrequencyData}
                    audioData={audioState}
                />
            </div>
        </div>
    )
}

export default Background;