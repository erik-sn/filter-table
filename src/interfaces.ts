export interface IDictionary<T> {
  [key: string]: T;
}

export interface IConfig {
  header: string;
  label: string;
  width: string;
  className?: string;
  childrenClass?: string;
  transform?: (rowValues: IDictionary<any>, label: any) => any;
}

export interface IRowData extends IDictionary<any> {
  classNames?: IDictionary<string>;
}


export interface IFilter {
  exact?: boolean;
  cleanedFilterValue?: string;
  filterKey?: string;
  filterValue?: string;
}

export interface IFilterTableProps {
  tableData: Array<IDictionary<string>>;
  className?: string;
  height?: number;
  showFilter?: boolean;
  showCsv?: boolean;
  showResults?: boolean;
  showTotals?: boolean;
  config: IConfig[];
  handleRowClick?: (row: any, column: number) => void;
}

export interface IFilterTableState {
  filterText: string;
  filterAny: boolean;
  filters: string[];
  sortParameter: string;
  sortDirection: number;
  tableData: Array<IDictionary<string>>;
}