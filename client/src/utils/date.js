// helper functions with all things related to dates

function formatDateStr(dateStr) {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}/${year}`;
}

function formateDateObjToStr(date) {
  return date ? date.format("MM/DD/YYYY") : "";
}

export { formatDateStr, formateDateObjToStr };
