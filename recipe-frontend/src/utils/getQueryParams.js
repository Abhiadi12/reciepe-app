export const validQueries = (queries) =>
  Object.entries(queries).reduce((acc, [key, value]) => {
    if (value === null || value === undefined) return acc;
    if (Array.isArray(value)) {
      acc[key] = value.join(",");
    } else if (typeof value === "number") {
      acc[key] = value.toString();
    } else if (typeof value === "boolean") {
      acc[key] = value ? "1" : "0";
    } else {
      acc[key] = value;
    }

    return acc;
  }, {});
