import * as React from 'react';

import FilterTable from '../src/components/filter_table';
import { IConfig } from '../src/interfaces';


const requireAll = (r: any) => r.keys().forEach(r);
requireAll(require.context('../src', true, /\.scss$/));

const config: IConfig[] = [
  { header: 'user', key: 'userName', width: '40%' },
  { header: 'old', key: 'oldValue', width: '20%' },
  { header: 'new', key: 'newValue', width: '20%' },
];

// sample data
const tableData: any = [];
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    for (let k = 0; k < 10; k++) {
      const object = {
        newValue: k * 5 / (j + 1),
        oldValue: j * 2.5,
        userName: `user_${i}`,
      };
      tableData.push(object);
    }
  }
}

const rowClick = (row: any, key: string) => {
  console.log(row);
  console.log(key);
};

const App = () => (
  <div className="test__container" style={{ height: '600px' }}>
    <h1>Test</h1>
    <FilterTable
      handleRowClick={rowClick}
      tableData={tableData}
      config={config}
      rowHeight={20}
      showFilter={true}
      showResults={true}
      showCsv={true}
      showTotals={true}
    />
  </div>
);

export default App;
