import './App.css';

import DropdownMenu from './Components/DropdownMenu.js';
import { MultiCity } from './Components/MultiCity.js';
import { OneWay } from './Components/OneWay.js';
import { RoundTrip } from './Components/RoundTrip.js';
import SearchButton from './Components/SearchButton.js';

function handleTitleChange(selectedTitle, setInformation) {
  if (selectedTitle === 'One Way') {
    setInformation(<div>
      <OneWay />
      <SearchButton />
    </div>)
  } else if (selectedTitle === 'Multi City') {
    setInformation(<div>
      <OneWay />
      <div className='mt-1'>
        <MultiCity />
      </div>
    </div>);
  } else if (selectedTitle === 'Round Trip') {
    setInformation(<div>
      <OneWay />
      <div className='mt-1'>
        <RoundTrip />
        <SearchButton />
      </div>
    </div>);
  }
}

function App() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-[#d7b98e] p-4 rounded'>
        <DropdownMenu handleTitleChange={handleTitleChange} />
      </div>
    </div>
  );
}

export default App;
