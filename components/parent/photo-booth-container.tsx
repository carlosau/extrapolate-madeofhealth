import React, { useState } from 'react';
import PhotoBooth from '../home/photo-booth';
import Idpage from '../../pages/p/[id]'

export default function PhotoBoothContainer() {
    //shared states
    const [state, setState] = useState('output')
    const [loading, setLoading] = useState(true)

    return (
        <>
            {/* Pass the shared states as props to the PhotoBooth component */}
            <PhotoBooth state={state} setState={setState} loading={loading} setLoading={setLoading}  />
            
            {/* Pass the shared states as props to the IdPage component */}
            <Idpage state={state} setState={setState} loading={loading} setLoading={setLoading} />
        </>
    )
} 