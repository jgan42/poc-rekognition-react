export const sanitizePathAndValue = (path: string, value: any) => {
  if (path.match(/(\/\/)|(undefined)|(null)/)) {
    throw new Error('setValue ERROR PATH');
  }
  if (value && typeof value === 'object' && !value.length) {
    Object.entries(value).forEach(([key, val]) => {
      if (!val && val !== 0) {
        delete value[key];
      }
    });
  }
  return value;
};
