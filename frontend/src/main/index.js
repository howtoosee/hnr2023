import React, { useState } from 'react';
import axios from 'axios';
import './textinput.css';

const MainComponent = () => {
    const [link, setLink] = useState("");
    const [paragraph, setParagraph] = useState("");

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const onClick = async () => {
        setParagraph("");
        let isGenerated = false;

        if (!link) {
            console.error("invalid link, empty string")
            return;
        }

        const postLink = `http://localhost:3000/summary?link=${String(link)}`;
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
                    isGenerated = true
                    setParagraph(res.data.summary)
                } else {
                    await sleep(10000);
                }
            } catch (err) {
                console.error(err);
                return;
            }
        }
    }

    return (
        <div className='Main'>
            <div className='Input'>
                <input
                    className='TextInput' 
                    type='text'
                    onChange={(link) => setLink(link.target.value)}/>
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