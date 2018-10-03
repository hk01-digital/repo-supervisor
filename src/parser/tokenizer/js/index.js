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
  console.log(`tokens: ${JSON.stringify(tokens, null, 6)}`);
  const t2 = tokens.filter(t => t.type.label === 'string')
    .map(t => t.value)
    .filter(s => s.length < 100)
    .filter(t => !t.match('[^\u0000-\u007F]+'));
  console.log(`tokens after filter: ${JSON.stringify(t2, null, 6)}`);

  return uniq(
      t2
  );
};
