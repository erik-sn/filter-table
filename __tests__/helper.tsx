// tslint:disable:no-string-literal
import * as chai from 'chai';
import * as jsdom from 'jsdom';
import * as  React from 'react';

// tslint:disable-next-line:no-var-requires
const URL = require('url');
URL.createObjectURL = (): any => undefined;

class Blob {
  constructor(content: any, config: any) {}
};

// tslint:disable-next-line:max-classes-per-file
class Dictionary<TValue> {
    [index: string]: TValue;
};

// jsdom configuration
declare const global: any;
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const window = doc.defaultView;
global['document'] = doc;
global['window'] = window;
global['window'].localStorage = storageMock();
global['navigator'] = {userAgent: 'node.js'};
global['HTMLElement'] = global['window'].HTMLElement;
global['Blob'] = Blob;
global['URL'] = URL;

export function addMSBlob(): any {
  global['navigator']['msSaveBlob'] = (blob: any): void => undefined;
}

export function removeMSBlob(): any {
  global['navigator']['msSaveBlob'] = undefined;
}

function storageMock(): {} {
  const storage = new Dictionary();

  return {
    setItem(key: string, value: string) {
      storage[key] = value || '';
    },
    getItem(key: string) {
      return storage[key] || null;
    },
    removeItem(key: string) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key(i: number) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
  };
}


