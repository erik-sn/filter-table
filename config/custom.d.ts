
interface ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
}

interface Array<T> {
    find(predicate: (search: T) => boolean) : T;
}

declare module 'autoprefixer' {
  const _: any;
  export = _;
}

declare module 'react-infinite' {
  const _: any;
  export = _;
}
