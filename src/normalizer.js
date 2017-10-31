/**
 * Normalizes the data to make more sensible errors handling
 */
export default (originalData = {}, schema = {}) => {
  const { required = [] } = schema;

  return Object.keys(originalData).reduce((clearData, key) => {
    const value = originalData[key];
    const requiredAndEmpty = required.includes(key) && value === '';

    // considering empty strings as non-present data
    clearData[key] = requiredAndEmpty ? undefined : value;

    return clearData;
  }, {});
};
