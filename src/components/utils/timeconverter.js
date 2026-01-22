export  const timeConverter = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h ago`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}min ago`;
  } else if (minutes > 0) {
    return `${minutes}min ago`;
  } else {
    return "Just now";
  }
}