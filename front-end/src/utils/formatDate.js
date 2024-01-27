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
