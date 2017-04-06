import { expect } from 'chai';
import { ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import FilterCsv, { ITableCsvProps } from '../src/components/filter_csv';
import { IConfig, IDictionary } from '../src/interfaces';

const tableData: Array<IDictionary<any>> = [
  { name: 'one', test: '1'},
  { name: 'two', test: '2'},
  { name: 'three', test: '3'},
  { name: 'four', test: '4'},
];

const tableHeaders: IConfig[] = [
  { header: 'name', key: 'Name', width: '20%' },
  { header: 'test', key: 'Test', width: '20%' },
];

describe('filter_csv.test.tsx |', () => {
  let component: ShallowWrapper<{}, {}>;
  const props: ITableCsvProps = {
    tableData,
    tableHeaders,
  };

  beforeEach(() => {
    component = shallow(<FilterCsv {...props} />);
  });

  it('renders something & has correct containers', () => {
    expect(component).to.exist;
    expect(component.find('.filter_table__csv-container').length).to.equal(1);
  });

  it('contains a Csv element', () => {
    expect(component.find('CsvGenerator').length).to.equal(1);
  });
});
