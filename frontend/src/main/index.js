import React, { useRef, useState } from 'react';
import axios from 'axios';
import './textinput.css';

const MainComponent = () => {
    const [link, setLink] = useState("");
    const [paragraph, setParagraph] = useState("");
    const [isGenerated, setIsGenerated] = useState(false);

    const ref = useRef(null);
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const onClick = async () => {
        setIsGenerated(false);
        setLink(ref.current.value.toString());

        if (!link) {
            console.error("invalid link, empty string")
            return;
        }

        const postLink = `http://localhost:3000/summary?link=${link}`;
        try {
            await axios.post(postLink);
        } catch (err) {
            console.error(err);
            return;
        }

        while (!isGenerated) {
            try {
                const res = await axios.get(postLink);
                if (res.data.done) {
                    setIsGenerated(true);
                    setParagraph(res.data.summary)
                }
            } catch (err) {
                console.error(err);
                return;
            }

            await sleep(10000);
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