import * as React from 'react';

import Csv from './csv';


import { IConfig, IDictionary } from '../interfaces';


export interface ITableCsvProps {
  tableData: Array<IDictionary<any>>;
  tableHeaders: IConfig[];
}

const TableCsv = ({ tableData, tableHeaders }: ITableCsvProps) => (
  <div className="filter_table__csv-container">
    <Csv
      fileName="test_file"
      data={tableData}
      params={tableHeaders}
    />
  </div>
);

export default TableCsv;
