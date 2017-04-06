export interface IDictionary<T> {
  [key: string]: T;
}

export interface IConfig {
  header: string;
  key: string;
  width: string;
  transform?: (columnValues: IDictionary<any>, key: string) => any;
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
