exports = module.exports = mama;

function mama(ms, good, bad) {
  return new Mama(ms, good, bad);
}

function Mama(ms, good, bad) {
  if (!(this instanceof Mama)) return new Mama(ms, good, bad);
  if (!good && !bad) { good = defaultGood; bad = defaultBad; }
  if (!bad) { bad = good; good = defaultGood; }
  this.checkInPeriod = ms;
  this.good = good;
  this.bad = bad;
  this.missedCheckIns = 0;
  this.timeout = undefined;
}

Mama.prototype.checkIn = function() {
  this.good();
  clearTimeout(this.timeout);
  this.timeout = setTimeout(this.bad, this.checkInPeriod);
}

function defaultGood() {
  console.log('Thanks for checking in!');
}

function defaultBad() {
  console.log('Oh no! You missed checked in.');
}
