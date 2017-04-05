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
