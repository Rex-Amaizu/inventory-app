export const formatDate = (dateString: string): string => {
  // Try to create a date object
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    // Handle invalid date case
    return "Invalid Date"; // Or any other fallback value
  }

  // If date is valid, format it with date and time
  return new Intl.DateTimeFormat("en-US", {
    month: "long", // Full month name
    day: "numeric", // Numeric day
    year: "numeric", // Full year
    hour: "numeric", // Numeric hour
    minute: "numeric", // Numeric minute
    second: "numeric", // Numeric second (optional)
    hour12: true, // 12-hour format (true) or 24-hour format (false)
  }).format(date);
};
