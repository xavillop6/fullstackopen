import './App.css';
import Hello from './Hello.js';


function App() {
  const message = 'Hello World!'
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Xavi" age="30" color="red" />
      <Hello name="Miquel" age="66" color="blue" />
    </div>
  );
}

export default App;
