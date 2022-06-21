import {
  ChangeEvent,
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

import { ClassNameWithChildren } from '../../types';

interface RadioGroupContextValue {
  name: string;
  checked: string | null;
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined);

const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext);
  if (context === undefined) {
    throw Error('Radio Context Error');
  }
  return context;
};

type RadioGroupProps = {
  name: string;
  onChange: (value: string) => void;
} & PropsWithChildren;

export const RadioGroup = ({ name, onChange, children }: RadioGroupProps) => {
  const [checked, setChecked] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setChecked(value);
    onChange(value);
  };

  const memoizeValue = useMemo(
    () => ({ name, checked, handleChange }),
    [name, checked, handleChange]
  );

  return (
    <fieldset>
      <RadioGroupContext.Provider value={memoizeValue}>
        {children}
      </RadioGroupContext.Provider>
    </fieldset>
  );
};

const RadioGroupLegend = ({
  legend,
  className,
}: {
  legend: ReactNode;
  className?: string;
}) => {
  return <legend className={className}>{legend}</legend>;
};

RadioGroup.Legend = RadioGroupLegend;

export const RadioGroupItem = ({
  className,
  children,
}: ClassNameWithChildren): JSX.Element => {
  return <div className={className}>{children}</div>;
};

type RadioGroupItemInputProps = {
  value: string;
  className?: string;
};

const RadioGroupItemInput = ({ value, className }: RadioGroupItemInputProps) => {
  const { name, checked, handleChange } = useRadioGroupContext();
  return (
    <input
      className={className}
      type='radio'
      name={name}
      value={value}
      checked={checked === value}
      onChange={handleChange}
    />
  );
};

const RadioGroupItemLabel = ({ className, children }: ClassNameWithChildren) => {
  return <label className={className}>{children}</label>;
};

RadioGroupItem.Input = RadioGroupItemInput;
RadioGroupItem.Label = RadioGroupItemLabel;
