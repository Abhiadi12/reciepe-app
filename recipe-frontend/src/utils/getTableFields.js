export function getTableFields(data) {
  if (Array.isArray(data)) {
    return data.map((item, itemIndex) => {
      return typeof item === "object" ? item.name : item;
    });
  }

  return data;
}
