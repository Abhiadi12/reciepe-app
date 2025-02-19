/**
 * @param {Array or string} data
 * @returns comma separated string of table fields
 * @description Get table fields from data
 */

export function getTableFields(data) {
  if (Array.isArray(data)) {
    return data.map((item) => {
      return typeof item === "object" ? item.name : item;
    });
  }

  return data;
}
