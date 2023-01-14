import React from 'react';
import './header.css';

const WelcomeHeader = () => {
    return (
        <div>
            <p>
                Welcome to <b>The Summarizer</b>!
            </p>
            <p className='Header'>
                Paste the link of your video in the text box below to get a short summary of any (YouTube) video.
            </p>
        </div>
    );
}

export default WelcomeHeader;