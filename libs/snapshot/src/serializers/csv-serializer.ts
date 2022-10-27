import { Serializer } from './serializer';
import { Website } from 'entities/website.entity';
import { CoreResult } from 'entities/core-result.entity';
import * as _ from 'lodash';
import { Parser } from 'json2csv';
import { flatten } from 'flat';

export class CsvSerializer implements Serializer {
  columnOrder: string[];

  constructor(columnOrder = []) {
    this.columnOrder = columnOrder;
  }

  get fileExtension() {
    return 'csv';
  }

  serialize(websites: Website[]) {
    // Throw an exception if there's a mismatch between CSV_COLUMN_ORDER and the
    // CoreResult entity.
    this.ensureAllFields(
      new Set([...CoreResult.getColumnNames(), ...Website.getColumnNames()]),
    );

    const serializedResults = websites.map((website) => website.serialized());
    return this.createCsv(serializedResults);
  }

  ensureAllFields(expectedHeaders: Set<string>) {
    const providedHeaders = new Set(this.columnOrder);
    if (!_.isEqual(expectedHeaders, providedHeaders)) {
      const missing = Array.from(expectedHeaders).filter(
        (x) => !providedHeaders.has(x),
      );
      const extra = Array.from(providedHeaders).filter(
        (x) => !expectedHeaders.has(x),
      );
      throw new Error(
        `Can't create CSV with missing or extra fields. <Missing: ${JSON.stringify(
          missing,
        )} Extra: ${JSON.stringify(extra)}`,
      );
    }
  }

  createCsv(rows: { [x: string]: any }[]) {
    // Return header row on empty rows array.
    if (rows.length === 0) {
      return this.columnOrder.map((f) => `"${f}"`).join(',');
    }

    // Get rows flattened into dot-delimited key names.
    const { allHeaders, flattenedRows } = this.flattenRows(rows);

    // Sort allHeaders, placing nested attributes after their position in the
    // specified column order.
    const fields = this.sortOrder(this.columnOrder, Array.from(allHeaders));

    const parser = new Parser({ fields });
    return parser.parse(flattenedRows);
  }

  private flattenRows(rows: { [x: string]: any }[]) {
    const allHeaders = new Set<string>();
    const flattenedRows = rows.map((row) => {
      const flattened: { [x: string]: any } = flatten(row, { safe: true });
      Object.keys(flattened).forEach((item) => allHeaders.add(item));
      return flattened;
    });
    return { allHeaders, flattenedRows };
  }

  private sortOrder(fieldOrder: string[], flattenedFields: string[]) {
    const fields = flattenedFields.filter((field) => {
      const split = field.split('.');
      return fieldOrder.includes(split[0]);
    });

    return fields.sort((a, b) => {
      const aSplit = a.split('.');
      const bSplit = b.split('.');
      const aIndex = fieldOrder.indexOf(aSplit[0]);
      const bIndex = fieldOrder.indexOf(bSplit[0]);

      if (aIndex < bIndex) {
        return -1;
      } else if (aIndex > bIndex) {
        return 1;
      } else {
        // aIndex === bIndex
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }
}
