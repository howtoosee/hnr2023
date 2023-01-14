import React, { useRef, useState } from 'react';
import './textinput.css';

const TextInput = () => {
    const [link, setLink] = useState("");
    const ref = useRef(null);

    const onClick = () => {
        setLink(ref.current.value);
    }

    return (
        <div className='Input'>
            <input
                ref={ref}
                className='TextInput' 
                type='text'
                onChange={setLink}/>
            <button 
                className='GoButton'
                onClick={onClick}>Go!</button>
        </div>
    );
}

export default TextInput;