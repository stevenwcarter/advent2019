import _ from 'lodash';

export const readInputAsNumbers = (input) => input.split(/\r|\n|\r\n/).map(a => parseInt(_.trim(a), 10)).filter(a => _.isNumber(a) && !_.isNaN(a));
export const readInputAsStrings = (input) => input.split(/\r|\n|\r\n/).map(_.trim).filter(a => !_.isEmpty(a));