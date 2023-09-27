import React from "react";

interface ChildProps {
    sharedState: string;
    setSharedState: (value: string) => void;
}

export default function ChildComponent ({ sharedState, setSharedState }: ChildProps) {
    return (
        <div>
            <p>Shared State: {sharedState}</p>
            <button onClick={() => setSharedState('newValuefromButton')}>Update Shared State</button>
        </div>
    )
}