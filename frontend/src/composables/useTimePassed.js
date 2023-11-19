function timePassed(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const diffInSeconds = Math.abs((now - date) / 1000);
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;
  const diffInMonths = diffInDays / 30.44; // Average number of days in a month
  const diffInYears = diffInDays / 365.25; // considering leap years

  if (diffInYears >= 1) {
    return `${Math.round(diffInYears)} y ago`;
  } else if (diffInMonths >= 1) {
    return `${Math.round(diffInMonths)} mo ago`;
  } else if (diffInDays >= 1) {
    return `${Math.round(diffInDays)}d ago`;
  } else if (diffInHours >= 1) {
    return `${Math.round(diffInHours)}h ago`;
  } else if (diffInMinutes >= 1) {
    return `${Math.round(diffInMinutes)} min ago`;
  } else {
    return `${Math.round(diffInSeconds)} s ago`;
  }
}

export function useTimePassed() {
  return timePassed;
}
