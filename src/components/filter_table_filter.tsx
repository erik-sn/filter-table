import * as React from 'react';

import { debounce } from '../utils';

export interface IFilterProps {
  filterAny: boolean;
  updateFilter: (filterValue: string) => void;
}

export interface IFilterState {
  filterValue: string;
}

/**
 * @class Filter
 * @extends {Component}
 */
class Filter extends React.Component<IFilterProps, IFilterState> {

  private hintAny: string = 'matching any filter';
  private hintAll: string = 'matching all filters';

  private updateFilter: (filterValue: string) => void;

  /**
   * Creates an instance of Filter.
   *
   * @param {any} props
   *
   * @memberOf Filter
   */
  constructor(props: IFilterProps) {
    super(props);
    this.state = {
      filterValue: '',
    };
    this.handleChange = this.handleChange.bind(this);
    if (props.updateFilter) {
      this.updateFilter = debounce(props.updateFilter, 250);
    }
  }

  /**
   * Call the parent's updateFilter method when a change
   * event occurs on the text field'
   *
   * @param {object} event
   *
   * @memberOf Filter
   */
  public handleChange(event: React.FormEvent<HTMLInputElement>): void {
    event.preventDefault();
    const filterValue = event.currentTarget.value;
    if (this.updateFilter) {
      this.updateFilter(filterValue);
    }
    this.setState({ filterValue });
  }

  public render(): JSX.Element {
    const hintText = this.props.filterAny ? this.hintAny : this.hintAll;
    return (
      <input
        id="filter_table__filter-field"
        style={{ width: '100%' }}
        placeholder={`Enter comma separated filters - ${hintText}`}
        onChange={this.handleChange}
        value={this.state.filterValue}
      />
    );
  }
}

export default Filter;
