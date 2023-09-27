import React, { useState } from 'react';
import PhotoBooth from '../home/photo-booth';
//import PhotoPage from '../../pages/p/[id]';

interface PhotoBoothContainerProps {
    input: string,
    blurDataURL: string,
    output: string | null,
}

export default function PhotoBoothContainer({ input, blurDataURL, output }: PhotoBoothContainerProps) {
    //shared states
    const [state, setState] = useState('output')
    const [loading, setLoading] = useState(true)

     // Simulate fetching data

    return (
        <>
            {/* Pass the shared states as props to the PhotoBooth component */}
            <PhotoBooth state={state} setState={setState} loading={loading} setLoading={setLoading} input={input} blurDataURL={blurDataURL} output={output}  />
        
         {/* Pass the shared states as props to the PhotoPage component 
         <PhotoPage state={state} setState={setState} loading={loading} setLoading={setLoading} data={data} />
        */}
         </>
    )
} 