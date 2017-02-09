function convertFromSeconds(seconds) {
  const secNum = parseInt(seconds, 10);
  let hours = Math.floor(secNum / 3600);
  let minutes = Math.floor((secNum - (hours * 3600)) / 60);
  seconds = secNum - (hours * 3600) - (minutes * 60);  

  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;

  return `${hours}:${minutes}:${seceonds}`;
}

module.exports = {
  default: convertFromSeconds(seconds),
  fromSeconds: convertFromSeconds(seconds),
  fromMilliseconds: milliseconds => convertFromSeconds(Math.floor(milliseconds / 1000))
};