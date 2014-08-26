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
  this._consecutiveMisses = 0;
  this._consecutiveHits = 0;
  this._timeout = undefined;
}

Mama.prototype.checkIn = function() {
  this._consecutiveMisses = 0;
  ++this._consecutiveHits;
  this.good(this._consecutiveHits);
  this._resetTimeout();
}

Mama.prototype._bad = function() {
  this._consecutiveHits = 0;
  ++this._consecutiveMisses;
  this.bad(this._consecutiveMisses);
  this._resetTimeout();
}

Mama.prototype._resetTimeout = function() {
  clearTimeout(this._timeout);
  this._timeout = setTimeout(this._bad.bind(this), this.checkInPeriod);
}

Mama.prototype.stop = function() {
  throw Error('Implement me!');
}

Mama.prototype.pause = function() {
  throw Error('Implement me!');
}

function defaultGood(n) {
  console.log('Thanks for checking in! You\'ve checked in %d %s in a row.', n, pluralize('time', n));
}

function defaultBad(n) {
  console.log('Oh no! You\'ve missed %d %s in a row.', n, pluralize('checkin', n));
}

function pluralize(word, n) {
  return n === 1 ? word : word + 's';
}
