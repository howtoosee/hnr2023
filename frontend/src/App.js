import './App.css';

import MainComponent from './main';
import WelcomeHeader from './header';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <WelcomeHeader/>
        <MainComponent />
      </header>
    </div>
  );
}

export default App;
