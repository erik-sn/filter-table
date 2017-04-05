import * as React from 'react';

import Csv from './csv';


import { IDictionary } from '../interfaces';

export interface ITableHeader {
  header: string;
  label: string;
}

export interface ITableCsvProps {
  tableData: Array<IDictionary<any>>;
  tableHeaders: ITableHeader[];
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
