export function getTableFields(data) {
  if (Array.isArray(data)) {
    const formattedData = data.map((item) => {
      if (typeof item === "object" && item !== null) {
        return item.name;
      }
      return item;
    });
    return formattedData.join(", ");
  }

  return data;
}
