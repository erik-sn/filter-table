import { expect } from 'chai';
import { ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import Csv, { ICsvGeneratorProps } from '../src/components/csv';
import { IConfig, IDictionary } from '../src/interfaces';
import { addMSBlob, removeMSBlob } from './helper';

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
    label: 'name',
    transform: undefined,
    width: '200px',
  },
  {
    header: 'Value',
    label: 'value',
    transform: undefined,
    width: '200px',
  },
  {
    header: 'date',
    label: 'date',
    transform: undefined,
    width: '400px',
  },
];

describe('filter_csv.test.tsx |', () => {
  let component: ShallowWrapper<{}, {}>;
  const props: ICsvGeneratorProps = {
    data: tableData,
    fileName: 'test_csv.csv',
    params: config,
  };

  beforeEach(() => {
    component = shallow(<Csv {...props} />);
  });

  it('renders something & has correct containers', () => {
    expect(component).to.exist;
    expect(component.find('.download__container').length).to.equal(1);
  });

  it('contains a Csv element', () => {
    expect(component.find('button').length).to.equal(1);
  });

  it('generates csv file on button click', () => {
    component.find('button').simulate('click');
  });

  it('generates csv file on button click in IE', () => {
    addMSBlob();
    component.find('button').simulate('click');
    removeMSBlob();
  });

  it('generates a csv file on button click', () => {
    const instance: any = component.instance();
    const generateContent = instance.generateContent;
    const header = config.map((param) => param.header);
    const csvText = generateContent(tableData, header, config);
    expect(csvText).to.equal(
      `Name,Value,date\r\none,1,2017-01-16,\r\ntwo,2,2017-01-16,\r\nthree,3,2017-01-16,\r\nfour,4,2017-01-16,\r\nfive,5,2017-01-16,\r\nsix,6,2017-01-16,\r\nseven,7,2017-01-16,\r\neight,,2017-01-16,\r\nnine,9,2017-01-16,\r\nten,10,2017-01-16,\r\n`,
    );
  });

  it('generates a csv file on button click with no header', () => {
    const instance: any = component.instance();
    const generateContent = instance.generateContent;
    const csvText = generateContent(tableData, undefined, config);
    expect(csvText).to.equal(
      `one,1,2017-01-16,\r\ntwo,2,2017-01-16,\r\nthree,3,2017-01-16,\r\nfour,4,2017-01-16,\r\nfive,5,2017-01-16,\r\nsix,6,2017-01-16,\r\nseven,7,2017-01-16,\r\neight,,2017-01-16,\r\nnine,9,2017-01-16,\r\nten,10,2017-01-16,\r\n`,
    );
  });
});

describe('filter_csv.test.tsx | invalid props', () => {
  let component: ShallowWrapper<{}, {}>;

  it('no parameters', () => {
    const props: ICsvGeneratorProps = {
      data: tableData,
      fileName: 'test_csv.csv',
      params: undefined,
    };
    component = shallow(<Csv {...props} />);
    component.find('button').simulate('click');
  });

  it('no data', () => {
    const props: ICsvGeneratorProps = {
      data: undefined,
      fileName: 'test_csv.csv',
      params: config,
    };
    component = shallow(<Csv {...props} />);
    component.find('button').simulate('click');
  });

  it('no fileName', () => {
    const props: ICsvGeneratorProps = {
      data: tableData,
      fileName: undefined,
      params: config,
    };
    component = shallow(<Csv {...props} />);
    component.find('button').simulate('click');
  });
});
