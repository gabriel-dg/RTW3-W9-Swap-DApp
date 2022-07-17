import './App.css';

import { Text, Spacer, Divider } from '@nextui-org/react';
import "./components/Navbar"
import SwapForm from './components/SwapForm'
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='App'>
      <Spacer y={1} />
      <header>
        <Navbar />
        <Divider />
      </header>
      <Spacer y={5} />
      <SwapForm />
      <Spacer y={2} />
      <Divider />
      <Text h4 color="warning" weight="bold" align="center">
        © GdG 2022
      </Text>
    </div>
  );
}

export default App;
