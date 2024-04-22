import moment from 'moment';

function formatDateAgo(dateString) {
  const currentDate = moment();
  const inputDate = moment(dateString);
  const duration = moment.duration(currentDate.diff(inputDate));

  if (duration.asSeconds() < 60) {
    return Math.floor(duration.asSeconds()) + ' seconds ago';
  } else if (duration.asMinutes() < 60) {
    return Math.floor(duration.asMinutes()) + ' minutes ago';
  } else if (duration.asHours() < 24) {
    return Math.floor(duration.asHours()) + ' hours ago';
  } else if (duration.asDays() < 30) {
    return Math.floor(duration.asDays()) + ' days ago';
  } else if (duration.asMonths() < 12) {
    return Math.floor(duration.asMonths()) + ' months ago';
  } else {
    return Math.floor(duration.asYears()) + ' years ago';
  }
}
export default formatDateAgo;
export function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  const currentDate = new Date();

  // Check if the date is today
  if (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    // Format time in HH:mm AM/PM format
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${ampm}`;
  }

  // Check if the date is in the current week
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diffDays = Math.round(Math.abs((date.getTime() - currentDate.getTime()) / oneDay));
  if (diffDays < 7) {
    // Format date in abbreviated day format (e.g., Tue, Wed, etc.)
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }

  // Format date in abbreviated month and year format (e.g., Jan 2023)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
export function calculateTimeAgo(isoString) {
  const currentDate = new Date();
  const pastDate = new Date(isoString);

  // Calculate the difference in milliseconds
  const differenceMs = currentDate.getTime() - pastDate.getTime();

  // Convert milliseconds to minutes
  const minutesAgo = Math.round(differenceMs / (1000 * 60));

  // If it's more than 1 hour ago, return null
  if (minutesAgo >= 60 || minutesAgo === 0) {
    return null;
  }

  // Otherwise, return the time ago string
  return minutesAgo;
}
