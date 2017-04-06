import * as React from 'react';

import { IConfig, IDictionary, IRowData } from '../interfaces';
import Cell from './filter_table_cell';

export interface IRowProps {
  config: IConfig[];
  className?: string;
  rowData: IRowData;
  handleClick?: (rowData: IRowData, key: string) => void;
}

/**
 * Container component to order a row of table cells
 *
 * @param {any} { className, rowData, rowMap }
 */
class Row extends React.Component<IRowProps, {}> {

  constructor(props: IRowProps) {
    super(props);
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  /**
   * Generate a row of cells based on the rowData object
   * and the table configuration object.
   *
   * Row objects can contain a classNames field which is a mapping
   * of CSS classes to column fields. This allows for custom CSS
   * classes to be applied to rows and will adjust for the filter.
   *
   * @param {object} rowData - immutable Map
   * @param {object} config - immutable List, table configuration
   * @returns {object} - immutable List of JSX.Elements
   */
  public generateCells(rowData: IRowData, config: IConfig[]): JSX.Element[] {
    const classNames = rowData.classNames as IDictionary<string>;
    return config.map((option, index) => {
      const handleCellClick = () => this.handleCellClick(option.key);
      return (
        <Cell
          key={index}
          handleClick={handleCellClick}
          width={option.width}
          value={rowData[option.key]}
          className={classNames ? classNames[option.key as any] : ''}
        />
      );
    });
  }

  /**
   * Click handler method passed to cells. Cells return their
   * column index and the rowData and column index are returned
   * to the parent.
   *
   * @param {number} columnIndex
   *
   * @memberOf Row
   */
  public handleCellClick(key: string) {
    const { handleClick } = this.props;
    if (handleClick) {
      handleClick(this.props.rowData, key);
    }
  }

  public render(): JSX.Element {
    const { rowData, config, className } = this.props;
    return (
      <div className={`filter_table__row${className ? ` ${className}` : ''}`}>
        {this.generateCells(rowData, config)}
      </div>
    );
  }
}

export default Row;
