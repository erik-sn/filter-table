[![Build Status](https://travis-ci.org/erik-sn/filter-table.svg?branch=master)](https://travis-ci.org/erik-sn/filter-table)[![codecov](https://codecov.io/gh/erik-sn/filter-table/branch/master/graph/badge.svg)](https://codecov.io/gh/erik-sn/filter-table)


# Filter-Table

A react component that takes in an array of JavaScript objects, a configuration object and converts it to a filterable, sortable table.


### Installation

```bash
yarn add filter-table
```

Copy the .css file or require somewhere in your project so webpack pulls it into your bundle:

```javascript
require('filter-table/dist/index.css');
```



### Running tests

```bash
git clone https://github.com/erik-sn/filter-table.git
cd filter-table
npm t
```

### Features

- Infinite List: only rows that are currently visible to the user are displayed
- Filterable: Table can be filtered by keywords, partial/exact matching, case sensitivity
- Sortable: toggle sorting by column
- Download Data: user can download the table data as a .csv file
- Display Totals & Results: summarize table data
- Open CSS Styling: All table components have detailed class names and ids that are accessible for customized styling

### Props

```JavaScript
/**
Raw table data. Array of object literals:
[
  { column1: 'one', column2: 1, column3: 'A' },
  { column1: 'two', column2: 2, column3: 'B' },
  { column1: 'three', column2: 3, column3: 'C' },
  ...
]
*/
tableData: object[];


/**
Array of object literals, where each item is a configuration for a column:
[
  {
    key: string  // the object literal key that this column is responsible for
    header: string  // label that will show in the header row
    width: string  // either percent or px width of this column (i.e '15%', '30px')
    transform: (columnValues: [key: string]: string[], key: string) => any
  },
  ...
]

The transform function accepts an object where each key is a column configuration
key and columnValues contains all values from that column.

Example transform function to sum a column:
  const sum = (total: number, value: string) =>  total + Number(value.replace(/,/g, ''));
  const transform = (columnValues, key) => columnValues[key].reduce(sum, 0);

Example columnValues:
  {
    column1: ['one', 'two', 'three'],
    column2: ['1', '2', '3'],
    column3: ['A', 'B', 'C'],
  }

Note that all values have been converted to strings - your transform
function should take this into account.
*/
config: Config[];

className?: string;  // class that will be applied to top level

rowHeight: number;  // the height of each row

tableHeight?: number;  // if this is not specified the entire window is used

// returns the object that the clicked on row contains as well as the column key
handleRowClick?: (rowData: {}, key: string) => void;

allIcon?: JSX.Element;  // element to show if filtering is in "all" mode

anyIcon?: JSX.Element;  // element to show if filtering is in "any" mode

showFilter?: boolean;  // display the filter input field

showCsv?: boolean;  // display the download button that downloads table data

showResults?: boolean;  // display table summary

showTotals?: boolean;  // show column totals (i.e. results of transform functions)
```

## CSS Classes

- top level container: 'filter_table__container'
- filter container: 'filter_table__filter-bar'
- header container: 'filter_table__header'
- table body: 'filter_table__body'
- table row: 'filter_table__row'
- table cell: 'filter_table__cell'
- tabel column totals container: 'filter_table__totals-container'
- table summary container: 'filter_table__results-container'