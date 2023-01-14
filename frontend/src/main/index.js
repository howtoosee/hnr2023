import React, { useRef, useState } from 'react';
import axios from 'axios';
import './textinput.css';

const MainComponent = () => {
    const [link, setLink] = useState("");
    const [paragraph, setParagraph] = useState("");
    const [isGenerated, setIsGenerated] = useState(false);

    const ref = useRef(null);

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const onClick = () => {
        setLink(ref.current.value);

        const postLink = `localhost:3000/summary?link=${link}`;
        axios.post(postLink)
            .catch((err) => {
                console.error(err)
            });

        while (!isGenerated) {
            axios.get(postLink)
            .then((res) => {
                if (res.data.done) {
                    setIsGenerated(true);
                    setParagraph(res.data.summary)
                }
            })

            sleep(10);
        }
    }

    return (
        <div className='Main'>
            <div className='Input'>
                <input
                    ref={ref}
                    className='TextInput' 
                    type='text'
                    onChange={setLink}/>
                <button 
                    className='GoButton'
                    onClick={onClick}>Go!
                </button>
            </div>
            <p className='Paragraph'>
                {paragraph}
            </p>
        </div>
    );
}

export default MainComponent;