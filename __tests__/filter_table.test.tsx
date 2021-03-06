import { expect } from 'chai';
import { ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import FilterCsv from '../src/components/filter_csv';
import FilterTable, { IFilterTableProps } from '../src/components/filter_table';
import Header from '../src/components/filter_table_header_column';
import Results from '../src/components/filter_table_results';
import Total from '../src/components/filter_table_total';
import FilterToggle from '../src/components/filter_toggle';
import { IConfig, IDictionary } from '../src/interfaces';

describe('filter_table.test.tsx |', () => {
  const tableData: Array<IDictionary<any>> = [
    { name: 'one', value: '1', date: '2017-01-16' },
    { name: 'two', value: '2', date: '2017-01-16' },
    { name: 'three', value: '3', date: '2017-01-16' },
    { name: 'four', value: '4', date: '2017-01-16' },
    { name: 'five', value: '5', date: '2017-01-16' },
    { name: 'six', value: '6', date: '2017-01-16' },
    { name: 'seven', value: '7', date: '2017-01-16' },
    { name: 'eight', value: undefined, date: '2017-01-16' },
    { name: 'nine', value: '9', date: '2017-01-16' },
    { name: 'ten', value: 10, date: '2017-01-16' },
  ];

  const config: IConfig[] = [
    {
      header: 'Name',
      key: 'name',
      transform: undefined,
      width: '200px',
    },
    {
      header: 'Value',
      key: 'value',
      transform: undefined,
      width: '200px',
    },
    {
      header: 'date',
      key: 'date',
      transform: undefined,
      width: '400px',
    },
  ];

  describe('Has all optional components', () => {
    let handleRowClick: sinon.SinonSpy;
    const props: IFilterTableProps = {
      className: 'test_class',
      handleRowClick: undefined,
      rowHeight: 20,
      showCsv: true,
      showFilter: true,
      showResults: true,
      showTotals: true,
      tableData,
      config,
    };
    let component: ShallowWrapper<{}, {}>;
    beforeEach(() => {
      handleRowClick = sinon.spy();
      component = shallow(<FilterTable {...props} handleRowClick={handleRowClick} />);
    });

    it('renders something & has correct containers', () => {
      expect(component).to.exist;
      expect(component.find('.filter_table__container').length).to.equal(1);
    });

    it('has all mandatory components', () => {
      expect(component.find('TableData').length).to.equal(1);
    });

    it('has all optional components with booleans = true', () => {
      expect(component.find('.test_class').length).to.equal(1);
      expect(component.find('Filter').length).to.equal(1);
      expect(component.find(FilterToggle).length).to.equal(1);
      expect(component.find(Total).length).to.equal(1);
      expect(component.find(FilterCsv).length).to.equal(1);
      expect(component.find(Results).length).to.equal(1);
    });

    it('has correct number of header columns', () => {
      expect(component.find(Header).length).to.equal(3);
    });

    it('updates the filter, filterText, and tableData on filterText change', () => {
      const instance: any = component.instance();
      instance.handleFilterUpdate('name="three", "one", z, \'u\', test=missing, value=7');

      const finalState: any = component.state();
      // tslint:disable-next-line:quotemark
      expect(finalState.filters).to.deep.equal(['name="three"', '"one"', 'z', "'u'", 'test=missing', 'value=7']);

      const tableProps: any = component.find('TableData').props();
      expect(tableProps.finalTableData.length).to.equal(3);  // two matches to these filters
    });

    it('correctly filters when filterAny === false', () => {
      const instance: any = component.instance();
      instance.handleToggleMode();
      instance.handleFilterUpdate('e, i');

      const finalState: any = component.state();
      expect(finalState.filters).to.deep.equal(['e', 'i']);

      const tableProps: any = component.find('TableData').props();
      expect(tableProps.finalTableData.length).to.equal(3);  // three matches to these filters
    });

    it('correctly changes sort parameters', () => {
      const instance: any = component.instance();
      const initialState: any = component.state();
      expect(initialState.sortParameter).to.equal(undefined);
      expect(initialState.sortDirection).to.equal(undefined);

      instance.handleToggleSort('name');

      const firstState: any = component.state();
      expect(firstState.sortParameter).to.equal('name');
      expect(firstState.sortDirection).to.equal(1);

      instance.handleToggleSort('name');

      const secondState: any = component.state();
      expect(secondState.sortParameter).to.equal('name');
      expect(secondState.sortDirection).to.equal(-1);

      instance.handleToggleSort('name');

      const finalState: any = component.state();
      expect(finalState.sortParameter).to.equal(undefined);
      expect(finalState.sortDirection).to.equal(undefined);
    });

    it('updates tableData in state when new tableData passed through props', () => {
      const instance: any = component.instance();
      const nextTableData: Array<IDictionary<string>> = [
        { name: 'one', value: '1', date: '2017-01-16' },
      ];
      instance.componentWillReceiveProps({ tableData: nextTableData });

      const state: any = component.state();
      expect(state.tableData.length).to.equal(1);
    });
  });

  describe('Has no optional components', () => {
    let handleRowClick: sinon.SinonSpy;
    const props: IFilterTableProps = {
      className: '',
      handleRowClick: undefined,
      rowHeight: 20,
      showCsv: false,
      showFilter: false,
      showResults: false,
      showTotals: false,
      tableData,
      config,
    };
    let component: ShallowWrapper<{}, {}>;
    beforeEach(() => {
      handleRowClick = sinon.spy();
      component = shallow(<FilterTable {...props} handleRowClick={handleRowClick} />);
    });

    it('renders something & has correct containers', () => {
      expect(component).to.exist;
      expect(component.find('.filter_table__container').length).to.equal(1);
    });

    it('has all optional components when booleans = false', () => {
      expect(component.find('.test_class').length).to.equal(0);
      expect(component.find('Filter').length).to.equal(0);
      expect(component.find('FilterToggle').length).to.equal(0);
      expect(component.find('TableTotal').length).to.equal(0);
      expect(component.find('TableCsv').length).to.equal(0);
      expect(component.find('Results').length).to.equal(0);
    });
  });

  describe('Invalid Configuration - config object', () => {
    const props: any = {
      className: '',
      config:  [
        {
          transform: undefined,
        },
        {
          key: 'value',
          transform: undefined,
          width: 300,
        },
        {
          header: 'date',
          key: 'date',
          transform: undefined,
          width: 400,
        },
      ],
      handleRowClick: undefined,
      rowHeight: 20,
      showCsv: false,
      showFilter: false,
      showResults: false,
      showTotals: false,
      tableData,
    };
    let component: ShallowWrapper<{}, {}>;

    it('throws error on missing rowHeight', () => {
      expect(() => component = shallow(<FilterTable {...props}  />)).to.throw(
        'Invalid table configuration object. Configuration option at index 0 is invalid. Missing parameter: header',
      );
    });
  });

  describe('Invalid Configuration - rowHeight', () => {
    const props: any = {
      className: '',
      config:  [],
      handleRowClick: undefined,
      showCsv: false,
      showFilter: false,
      showResults: false,
      showTotals: false,
      tableData,
    };
    let component: ShallowWrapper<{}, {}>;

    it('throws error on missing rowHeight', () => {
      expect(() => component = shallow(<FilterTable {...props}  />)).to.throw(
        'rowHeight is a required property',
      );
    });
  });

  describe('Invalid Configuration - config', () => {
    const props: any = {
      className: '',
      handleRowClick: undefined,
      showCsv: false,
      showFilter: false,
      showResults: false,
      showTotals: false,
      tableData,
    };
    let component: ShallowWrapper<{}, {}>;

    it('throws error on missing config', () => {
      expect(() => component = shallow(<FilterTable {...props}  />)).to.throw(
        'config is a required property',
      );
    });
  });

  describe('Invalid Configuration - tableData', () => {
    const props: any = {
      className: '',
      config: [],
      handleRowClick: undefined,
      showCsv: false,
      showFilter: false,
      showResults: false,
      showTotals: false,
    };
    let component: ShallowWrapper<{}, {}>;

    it('throws error on missing tableData', () => {
      expect(() => component = shallow(<FilterTable {...props}  />)).to.throw(
        'tableData is a required property',
      );
    });
  });

  describe('Number Parameteters', () => {
    const numberTableData: Array<IDictionary<any>> = [
      { name: 'one', value: 1, date: '2017-01-16' },
      { name: 'two', value: 2, date: '2017-01-16' },
      { name: 'three', value: 3, date: '2017-01-16' },
      { name: 'four', value: 4, date: '2017-01-16' },
      { name: 'five', value: 5, date: '2017-01-16' },
      { name: 'six', value: 6, date: '2017-01-16' },
      { name: 'seven', value: 7, date: '2017-01-16' },
      { name: 'eight', value: 8, date: '2017-01-16' },
      { name: 'nine', value: 9, date: '2017-01-16' },
      { name: 'ten', value: 10, date: '2017-01-16' },
    ];
    const props: IFilterTableProps = {
      className: '',
      handleRowClick: undefined,
      rowHeight: 20,
      showCsv: false,
      showFilter: false,
      showResults: false,
      showTotals: false,
      tableData: numberTableData,
      config,
    };
    let component: ShallowWrapper<{}, {}>;
    let instance: any;
    beforeEach(() => {
      component = shallow(<FilterTable {...props}  />);
      instance = component.instance();
    });

    it('correctly sorts number data', () => {
      instance.generateFormatData(numberTableData, 'value');
      instance.handleToggleSort('value');
    });

    it('correctly sorts moment/date data', () => {
      instance.generateFormatData(numberTableData, 'date');
      instance.handleToggleSort('date');
    });
  });
});
