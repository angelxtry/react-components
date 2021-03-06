import './dropdown.css';

import { ChangeEvent, MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';

import { CloseIcon, DownArrowIcon } from './dropdown-icons';

export type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  placeHolder: ReactNode;
  options: Option[];
  isMulti?: boolean;
  isSearchable?: boolean;
  onSelect: (options: Option[]) => void;
};

export const Dropdown = ({
  placeHolder,
  options,
  isMulti,
  isSearchable,
  onSelect,
}: DropdownProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selected, setSelected] = useState<Option | undefined>(undefined);
  const [multiSelected, setMultiSelected] = useState<Option[] | undefined>(undefined);
  const [searchKeyword, setSearchKeyword] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = () => setShowMenu(false);
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  });

  useEffect(() => {
    setSearchKeyword('');
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  const getOptions = () => {
    if (!searchKeyword) {
      return options;
    }
    return options.filter(
      (option) => option.label.toLowerCase().indexOf(searchKeyword.toLowerCase()) >= 0
    );
  };

  const onClickInput = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const removeOption = (option: Option) => {
    if (!multiSelected) return [];
    return multiSelected.filter((o) => o.value !== option.value);
  };

  const onClickItem = (option: Option) => {
    setSelected(option);
    onSelect([option]);
  };

  const onClickMultiItem = (option: Option) => {
    if (!isMulti) return;
    if (multiSelected?.find((o) => o.value === option.value)) return;
    const newOptions = multiSelected ? [...multiSelected, option] : [option];
    setMultiSelected(newOptions);
    onSelect(newOptions);
  };

  const isSelected = (option: Option) => {
    if (!selected) {
      return false;
    }
    return selected.value === option.value;
  };

  const onTagRemove = (e: MouseEvent<HTMLDivElement>, option: Option) => {
    e.stopPropagation();
    if (!multiSelected) return;
    setMultiSelected(removeOption(option));
  };

  const getDisplay = () => {
    if (selected) {
      return selected.label;
    }
    if (isMulti) {
      if (!multiSelected) {
        return placeHolder;
      }
      return (
        <div className='dropdown-tags'>
          {multiSelected.map((option) => (
            <div key={option.value} className='dropdown-tag-item'>
              {option.label}
              <span onClick={(e) => onTagRemove(e, option)}>
                <CloseIcon />
              </span>
            </div>
          ))}
        </div>
      );
    }
    return placeHolder;
  };

  return (
    <div className='dropdown-container'>
      <div className='dropdown-input' onClick={onClickInput}>
        <div className='dropdown-selected-value'>{getDisplay()}</div>
        <div className='dropdown-tools'>
          <div className='dropdown-tool'>
            <DownArrowIcon />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className='dropdown-menu'>
          {isSearchable && (
            <div className='search-box'>
              <input onChange={onSearch} value={searchKeyword} ref={searchRef} />
            </div>
          )}
          {getOptions().map((option) => (
            <div
              key={option.value}
              onClick={() => (isMulti ? onClickMultiItem(option) : onClickItem(option))}
              className={`dropdown-item ${isSelected(option)}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
