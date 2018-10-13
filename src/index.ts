/**
 * Copyright 2018 - Author gauravm.git@gmail.com
 */

const logger = console;

logger.info('Program started.');

// #region Mappable tuple and array types.

// Examples taken from:
// https://blogs.msdn.microsoft.com/typescript/announcing-typescript-3-1/#mappable-tuple-and-array-types

type Stringify<T> = {
  [K in keyof T]: string
};

function stringifyAll<T extends Array<unknown>>(...elements: T): Stringify<T> {

  return elements.map((x) => String(x)) as Stringify<T>;

}

const out = stringifyAll(1, 'a', true, {});
logger.log(out.length); // Length is preserved as not everything is stringified as [K in ..]: string

// #endregion Mappable tuple and array types.
