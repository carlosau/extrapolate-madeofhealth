import React, { useState } from "react";
import ChildComponent from "../home/ChildComponent";

export default function ParentComponent() {
    const [sharedState, setSharedState] = useState('InitilValue')

    return (
        <>
            <ChildComponent sharedState={sharedState} setSharedState={setSharedState} />
        </>
        
    )
}