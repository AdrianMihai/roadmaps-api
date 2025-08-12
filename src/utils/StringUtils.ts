export const isString = (val) => typeof val === 'string' || val instanceof String;

export const isEmptyString = (val) => !isString(val) || val.length === 0;
