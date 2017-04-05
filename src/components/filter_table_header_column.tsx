import * as React from 'react';

import { IConfig } from '../interfaces';


export interface IHeaderColumnProps {
  option: IConfig;
  sortParameter: string;
  sortDirection: number;
  handleClick: (label: string) => void;
  upIcon?: JSX.Element;
  downIcon?: JSX.Element;
}

class HeaderColumn extends React.Component<IHeaderColumnProps, {}> {

  /**
   * Return an icon depending on whether or not the sort
   * parameter matches the column header label, and which
   * direction we are sorting in
   *
   * @param {string} parameter - sort parameter
   * @param {string} label - column header label
   * @param {number} direction - 1 = ascending, 0 = descending
   * @returns {JSX.Element} - Icon
   */
  public generateSortIcon(label: string): JSX.Element {
    const { sortParameter, sortDirection, upIcon, downIcon } = this.props;
    if (sortParameter === label && sortDirection === 1) {
      return upIcon;
    } else if (sortParameter === label && sortDirection === -1) {
      return downIcon;
    }
  }

  public render(): JSX.Element {
    const { option, sortParameter, handleClick } = this.props;
    const { width, header, label, childrenClass } = option;
    const handleHeaderClick = () => handleClick(label);
    return (
      <div
        style={label === sortParameter ? { fontWeight: 'bold', width } : { width }}
        onClick={handleHeaderClick}
        className={`filter_table__header-cell ${childrenClass || ''}`.trim()}
      >
        <span className="filter_table__header-cell-label">{header}</span>
        <span className="filter_table__header-cell-icon">
          {this.generateSortIcon(label)}
        </span>
      </div>
    );
  }
}

export default HeaderColumn;
