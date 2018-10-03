import * as tokenizer from 'acorn';
import { defaults, uniq } from 'lodash';

/**
 * Return an array of all strings from javascript file.
 */
module.exports = (code, config) => {
  const tokens = [];

  try {
    tokenizer.parse(code, defaults({ onToken: tokens }, config));
  } catch (e) {
    /**
     * Error when parsing JS file.
     * @TODO fallback to parse whole file as a single blob.
     */
    return [];
  }

  return uniq(
    // Return only unique values of 'string' type objects.

    // regex '[^\u0000-\u007F]+' use to find out non english char
    tokens.filter(t => t.type.label === 'string')
      .map(t => t.value)
      .filter(t => !t.match('[^\u0000-\u007F]+'))
      .filter(s => s.length < 100)
  );
};
