export function formatDate(dateString) {
  const date = new Date(dateString);

  // Day with suffix (st, nd, rd, th)
  const day = date.getDate();
  const daySuffix = 
    day === 1 || day === 21 || day === 31 ? "st" :
    day === 2 || day === 22 ? "nd" :
    day === 3 || day === 23 ? "rd" : "th";

  // Month name
  const month = date.toLocaleString("en-US", { month: "long" });

  // Year
  const year = date.getFullYear();

  return `${day}${daySuffix} ${month}, ${year}`;
}
