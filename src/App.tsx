import './App.css';

import { Dropdown, Option } from './components/dropdown/dropdown';
import { DefaultRadio } from './components/radio/default-radio';

const colorOptions = [
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Yellow' },
];

const App = () => {
  const onSelect = (options: Option[]) => {
    console.log('onSelect', options);
  };
  return (
    <div className=''>
      <section className='p-6 flex flex-col'>
        <DefaultRadio />
        <br />
        <Dropdown
          placeHolder='Select...'
          options={colorOptions}
          isMulti
          onSelect={onSelect}
        />
      </section>
    </div>
  );
};

export default App;
