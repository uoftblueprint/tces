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

function monthsSince(dateStr) {
  const givenDate = new Date(dateStr);
  const currentDate = new Date();

  // Calculate the difference in years and months
  const yearsDifference = currentDate.getFullYear() - givenDate.getFullYear();
  const monthsDifference = currentDate.getMonth() - givenDate.getMonth();

  const totalMonths = yearsDifference * 12 + monthsDifference;

  if (currentDate.getDate() < givenDate.getDate()) {
    return totalMonths - 1;
  }

  return totalMonths;
}

export { formatDateStr, formateDateObjToStr, monthsSince };
