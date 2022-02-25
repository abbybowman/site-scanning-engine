import * as csv from './csv';

describe('csv creator', () => {
  it('produces a valid CSV', () => {
    const csvString = csv.createCsv(MOCK_DATA, ['field1', 'field2', 'field3']);
    expect(csvString).toEqual(`"field1","field2","field3"
"1a","2a","3a"
"1b","2b","3b"`);
  });

  it('handles an empty list', () => {
    const csvString = csv.createCsv([], ['field1', 'field2', 'field3']);
    expect(csvString).toEqual(`"field1","field2","field3"`);
  });

  it('errors on missing columns', () => {
    expect(() => csv.createCsv(MOCK_DATA, ['field1', 'field2'])).toThrow(
      /missing nor extra fields/,
    );
  });

  it('errors on extra columns', () => {
    expect(() =>
      csv.createCsv(MOCK_DATA, ['field1', 'field2', 'field3', 'field4']),
    ).toThrow(/missing nor extra fields/);
  });
});

const MOCK_DATA = [
  { field1: '1a', field2: '2a', field3: '3a' },
  { field1: '1b', field2: '2b', field3: '3b' },
];
