const debug = require('debug')('mysam-core/services/tokenize');

const extract = require('../../extract');

module.exports = class Tokenizer {
  create (data) {
    const text = data.text;
    const tokens = extract.tokenize(text);
    const stems = extract.stem(tokens);
    const result = { text, tokens, stems };

    debug('Tokenized', result);

    return Promise.resolve(result);
  }
};
