// tslint:disable-next-line:no-var-requires
module.exports = require('./components/filter_table.tsx');

if (process.env.BROWSER) {
  const requireAll = (r: any) => r.keys().forEach(r);
  requireAll(require.context('./sass/', true, /\.scss$/));
}
