import { expect } from 'chai';
import { ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import TableTotal, { ITotalProps } from '../src/components/filter_table_total';
import { IDictionary } from '../src/interfaces';

describe('filter_table_row.test.tsx |', () => {
  const sum = (total: number, value: string) =>  total + Number(value.replace(/,/g, ''));
  const transform = (columnValues: IDictionary<any>, key: string) => {
    return columnValues[key].reduce(sum, 0);
  };
  const props: ITotalProps = {
    config: [
      {
        header: 'Name',
        key: 'name',
        transform: undefined,
        width: '200px',
      },
      {
        header: 'Name',
        key: 'test',
        transform: undefined,
        width: '200px',
      },
      {
        header: 'Value',
        key: 'value',
        transform,
        width: '300px',
      },
    ],
    tableData: [
        {
        name: 'one',
        test: '22',
        value: '1',
        },
        {
        name: 'two',
        test: '23',
        value: '2',
        },
    ],
  };
  let component: ShallowWrapper<{}, {}>;
  beforeEach(() => {
    component = shallow(<TableTotal {...props} />);
  });

  it('renders something & has correct containers', () => {
    expect(component).to.exist;
    expect(component.find('.filter_table__totals-container').length).to.equal(1);
  });

  it('has the correct values for totals', () => {
    const rowProps: any = component.find('Row').props();
    expect(rowProps.rowData.name).to.equal('');
    expect(rowProps.rowData.value).to.equal(3);
  });
});
