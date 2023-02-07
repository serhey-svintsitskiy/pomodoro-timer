import React, {useRef} from 'react';
import useHover from "./useHover";

const Hover = () => {

    const buttonRef = useRef();
    const isHoverButton = useHover(buttonRef);

    return (
        <div
            style={{
                width: '300px',
                height: '300px',
                background: isHoverButton ? 'green' : 'red',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <div style={{border: '1px solid black'}}>
                <button
                    ref={buttonRef}
                >Click me!
                </button>
            </div>
        </div>
    );
};

export default Hover;