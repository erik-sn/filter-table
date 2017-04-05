import { expect } from 'chai';
import { ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import Results, { IResultsProps } from '../src/components/filter_table_results';
import { IDictionary } from '../src/interfaces';


describe('filter_table_cell.test.tsx |', () => {
  let component: ShallowWrapper<{}, {}>;
  const props: IResultsProps = {
    percent: '90%',
    ratio: '9/10',
  };

  beforeEach(() => {
    component = shallow(<Results {...props} />);
  });

  it('renders something & has correct containers', () => {
    expect(component).to.exist;
    expect(component.find('.filter_table__results-container').length).to.equal(1);
  });

  it('contains the results', () => {
    const text: string = component.find('.filter_table__results-container').text();
    expect(text).to.contain(props.ratio);
    expect(text).to.contain(props.percent);
  });
});
