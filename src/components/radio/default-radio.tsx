import { RadioGroup, RadioGroupItem } from './radio-group';

export const DefaultRadio = () => {
  return (
    <RadioGroup name='size' onChange={console.log}>
      <RadioGroup.Legend legend='Shirt Size' className='font-bold' />
      <br />
      <div className='flex flex-row justify-between'>
        <RadioGroupItem>
          <RadioGroupItem.Input value='small' />
          <RadioGroupItem.Label className='font-extralight'>small</RadioGroupItem.Label>
        </RadioGroupItem>
        <RadioGroupItem>
          <RadioGroupItem.Input value='medium' />
          <RadioGroupItem.Label className='font-medium'>medium</RadioGroupItem.Label>
        </RadioGroupItem>
        <RadioGroupItem>
          <RadioGroupItem.Input value='large' />
          <RadioGroupItem.Label className='font-extrabold'>large</RadioGroupItem.Label>
        </RadioGroupItem>
      </div>
    </RadioGroup>
  );
};
