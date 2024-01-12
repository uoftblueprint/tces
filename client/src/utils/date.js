function formatDateStr(dateStr) {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1; // getMonth() returns a zero-based index
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}/${year}`;
}

export default formatDateStr;
