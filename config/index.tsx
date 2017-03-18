import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import FilterTable from '../src/components/filter_table';


const rootEl = document.getElementById('app-container');
ReactDOM.render(
  <AppContainer>
    <h1>Test</h1>
    <FilterTable
      tableData={undefined}
      children={undefined}
      className={undefined}
      config={undefined}
      handleRowClick={undefined}
      height={undefined}
      key={undefined}
      ref={undefined}
      showCsv={undefined}
      showFilter={undefined}
      showResults={undefined}
      showTotals={undefined}
    />
  </AppContainer>,
  rootEl,
);

// react hot module reloading
declare const module: any; // silence TS error on module
if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default;
    ReactDOM.render(
      <AppContainer>
        <FilterTable
          tableData={undefined}
          children={undefined}
          className={undefined}
          config={undefined}
          handleRowClick={undefined}
          height={undefined}
          key={undefined}
          ref={undefined}
          showCsv={undefined}
          showFilter={undefined}
          showResults={undefined}
          showTotals={undefined}
        />
      </AppContainer>,
      rootEl,
    );
  });
}
