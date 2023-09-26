import React, { useState } from 'react';
import PhotoBooth from '../home/photo-booth';
import PhotoPage from '../../pages/p/[id]';


export default function PhotoBoothContainer() {
    //shared states
    const [state, setState] = useState('output')
    const [loading, setLoading] = useState(true)

     // Simulate fetching data
     const data = {  
    output: ""
    };

    return (
        <>
            {/* Pass the shared states as props to the PhotoBooth component */}
            <PhotoBooth state={state} setState={setState} loading={loading} setLoading={setLoading}  />
        
         {/* Pass the shared states as props to the PhotoPage component */}
         <PhotoPage state={state} setState={setState} loading={loading} setLoading={setLoading} data={data} />
        </>
    )
} 