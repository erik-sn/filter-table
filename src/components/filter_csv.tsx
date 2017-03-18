import * as React from 'react';
import * as Csv from 'react-csv';

console.log(Csv);


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
      Csv="test_file"
      data={tableData}
    >
    DOWNLOAD
    </Csv>
  </div>
);

export default TableCsv;
