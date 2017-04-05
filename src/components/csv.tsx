import * as React from 'react';

import { IConfig, IDictionary } from '../interfaces';

export interface ICsvGeneratorProps {
  customClass?: string;
  customStyle?: any;
  data: Array<IDictionary<any>>;
  params: IConfig[];
  fileName: string;
}


class CsvGenerator extends React.Component<ICsvGeneratorProps, {}> {

  constructor(props: ICsvGeneratorProps) {
    super(props);
    this.generateCsv = this.generateCsv.bind(this);
    this.generateContent = this.generateContent.bind(this);
  }

  /**
   * Retrieve data, which should be a flat javascript object, and the
   * fileName to be used from component properties and download a .CSV
   * file to the client. Each object represents a row, and each property
   * within the object a column.
   */
  public generateCsv(): void {
    const { data, params = [], fileName } = this.props;
    if (!data || !fileName) {
      console.warn('No data or file name has been set on the CSV Generator');
      return;
    }

    // generate CSV file contents from the object
    const header = params.map((param) => param.header);
    const content = this.generateContent(data, header, params);
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, `${fileName}.csv`);
    } else {
      const link = document.createElement('a');
      const url: any = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${fileName}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
    }
  }

  public stripCommas(value: any): string {
    if (typeof value === 'string') {
      return value.replace(/,/g, '');
    }
    return value;
  }

  /**
   * Generate a comma seperated values (CSV) file based on a javascript object. This
   * object needs to be flat - nested objects are not supported.
   * @param  {object} rowData
   * @param  {array} header array of strings representing table header
   * @param  {object} params table parameters
   * @return  {string} content
   */
  public generateContent(rowData: Array<IDictionary<string>>,
                         header: string[],
                         params: IConfig[]): string {
    let content = '';
    // make a single header row
    if (header && header.length > 0) {
      content += header.reduce((prev, current) => `${prev},${current}`);
      content += '\r\n';
    }

    // iterate over data array - each object is a row, each property is a column
    for (const obj of rowData) {
      for (const param of params) {
        const label = param.label;
        // remove all commas in values to .csv file does not get corrupted
        content += `${obj[label] !== undefined ? this.stripCommas(obj[label]) : ''},`;
      }
      content += '\r\n';
    }
    return content;
  }

  public render(): JSX.Element {
    const { customClass, customStyle } = this.props;
    return (
      <div className="download__container">
        <button
          type="button"
          onClick={this.generateCsv}
        >
        download
        </button>
      </div>
    );
  }
}

export default CsvGenerator;
