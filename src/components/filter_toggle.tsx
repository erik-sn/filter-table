import * as React from 'react';

export interface IFilterToggleProps {
  handleClick: () => void;
  filterAny: boolean;
  allIcon?: JSX.Element;
  anyIcon?: JSX.Element;
}

const allButton = <button className="filter_table__toggle-button">All</button>;
const anyButton = <button className="filter_table__toggle-button">Any</button>;

const FilterToggle = ({ handleClick, filterAny, allIcon,
  anyIcon }: IFilterToggleProps): JSX.Element => {
  const allIconElement = allIcon || allButton;
  const anyIconElement = anyIcon || anyButton;
  return (
    <div className="filter_table__mode-container" onClick={handleClick} >
      {filterAny ? allIconElement : anyIconElement}
    </div>
  );
};

export default FilterToggle;
