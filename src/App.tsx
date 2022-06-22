import './App.css';

import { Dropdown } from './components/dropdown/dropdown';
import { DefaultRadio } from './components/radio/default-radio';

const options = [
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Yellow' },
];

const App = () => {
  return (
    <div className=''>
      <section className='p-6 flex flex-col'>
        <DefaultRadio />
        <br />
        <Dropdown placeHolder='Select...' options={options} isMulti />
      </section>
    </div>
  );
};

export default App;
