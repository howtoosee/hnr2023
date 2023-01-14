import './App.css';

import TextInput from './textinput';
import WelcomeHeader from './header';
import { useState } from 'react';

function App() {
  const [link, setLink] = useState("");
  
  return (
    <div className="App">
      <header className="App-header">
        <WelcomeHeader/>
        <TextInput />
      </header>
    </div>
  );
}

export default App;
