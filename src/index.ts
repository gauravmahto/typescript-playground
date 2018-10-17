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

logger.group('Preserve actual type:');
logger.info(out.length); // Length is preserved as not everything is stringified as [K in ..]: string
logger.groupEnd();

// #endregion Mappable tuple and array types.

// #region

type TypeName<T> =
  T extends string ? T :
  T extends string[] ? T :
  never;

function test<T extends TypeName<string | string[]>>(val: T): T {

  return val;

}

function test2<T extends string | string[]>(val: T): T {

  return val;

}

logger.group('Return type:');

const a = test('a');
logger.info(a.charAt(0));

const b = test(['a']);
logger.info(b.some((val) => Boolean(val.charAt(0))));

const c = test('a');
logger.info(a.charAt(0));

const d = test(['a']);
logger.info(b.some((val) => Boolean(val.charAt(0))));

logger.groupEnd();

// Extract return types.

type ReturnT<T> = T extends (...args: any[]) => infer R ? R : any;

// Conditional types:

type Unpacked<T> =
  T extends Array<infer X> ? X :
  T extends (...args: any[]) => infer Y ? Y :
  T extends Promise<infer Z> ? Z :
  T;

type T0 = Unpacked<string>;  // string
type T1 = Unpacked<string[]>;  // string
type T2 = Unpacked<() => string>;  // string
type T3 = Unpacked<Promise<string>>;  // string
type T4 = Unpacked<Array<Promise<string>>>;  // Promise<string>
type T5 = Unpacked<Unpacked<Array<Promise<string>>>>;  // string

type Foo<T> = T extends { a: infer U, b: infer U } ? U : never;
type T10 = Foo<{ a: string, b: string }>;  // string
type T11 = Foo<{ a: string, b: number }>;  // string | number

type Bar<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;
type T20 = Bar<{ a: (x: string) => void, b: (x: string) => void }>;  // string
type T21 = Bar<{ a: (x: string) => void, b: (x: number) => void }>;  // string & number

// #endregion
