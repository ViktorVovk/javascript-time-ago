"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convenientGradationTest = convenientGradationTest;

var _JavascriptTimeAgo = _interopRequireDefault(require("../source/JavascriptTimeAgo"));

var _gradation = require("../source/gradation");

var _style = require("../source/style");

var _LocaleDataStore = require("../source/LocaleDataStore");

var _en = _interopRequireDefault(require("../locale/en"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Just so this function code is covered.
_JavascriptTimeAgo.default.setDefaultLocale('en');

describe("time ago", function () {
  it("should try various flavours if some are not found", function () {
    var timeAgo = new _JavascriptTimeAgo.default('en');
    timeAgo.format(Date.now(), {
      flavour: ['exotic', 'short']
    }).should.equal('now');
  });
  it("should not use Intl.NumberFormat if it's not available", function () {
    var NumberFormat = Intl.NumberFormat;
    delete Intl.NumberFormat;
    var timeAgo = new _JavascriptTimeAgo.default('en');
    timeAgo.format(Date.now() + 60 * 1000).should.equal('in a minute');
    Intl.NumberFormat = NumberFormat;
  });
  it("should work when \"past\"/\"future\" messages are same for all quantifiers", function () {
    var timeAgo = new _JavascriptTimeAgo.default('en');
    timeAgo.format(Date.now() + 365 * 24 * 60 * 60 * 1000, {
      flavour: ['short-convenient']
    }).should.equal('in 1 yr.');
  });
  it("should work when \"now\" is a string (doesn't differentiate between \"past\" and \"future\")", function () {
    var timeAgo = new _JavascriptTimeAgo.default('en');
    timeAgo.format(Date.now(), {
      flavour: ['short-time']
    }).should.equal('now');
  });
  it("should format \"now\" for \"past\" time", function () {
    var timeAgo = new _JavascriptTimeAgo.default('en');
    timeAgo.format(Date.now() + 10, {
      flavour: ['long-convenient']
    }).should.equal('in a moment');
  });
  it("should accept a string style argument", function () {
    var timeAgo = new _JavascriptTimeAgo.default('en');
    timeAgo.format(Date.now(), 'twitter').should.equal('');
    timeAgo.format(Date.now(), 'time').should.equal('just now');
    timeAgo.format(Date.now(), 'exotic').should.equal('just now');
  });
  it("should accept empty constructor parameters", function () {
    var timeAgo = new _JavascriptTimeAgo.default();
    timeAgo.format(new Date()).should.equal('just now');
  });
  it("should accept Dates", function () {
    var timeAgo = new _JavascriptTimeAgo.default('en');
    timeAgo.format(new Date()).should.equal('just now');
  });
  it("should accept mocked Dates when testing", function () {
    var timeAgo = new _JavascriptTimeAgo.default('en');
    var mockedDate = {
      getTime: function getTime() {
        return Date.now();
      }
    };
    timeAgo.format(mockedDate).should.equal('just now');
  });
  it("should not accept anything but Dates and timestamps", function () {
    var timeAgo = new _JavascriptTimeAgo.default('en');

    var thrower = function thrower() {
      return timeAgo.format('Jan 14, 2017');
    };

    thrower.should.throw('Unsupported relative time formatter input: string, Jan 14, 2017');
  });
  it("should return an empty string if the passed units are not available in locale data", function () {
    var timeAgo = new _JavascriptTimeAgo.default('en');
    timeAgo.format(Date.now(), {
      units: ['femtosecond']
    }).should.equal('');
  });
  it("should return an empty string if no unit is suitable", function () {
    var timeAgo = new _JavascriptTimeAgo.default('en');
    var now = Date.now(); // Remove 'now' unit formatting rule temporarily

    var justNowFormatter = (0, _LocaleDataStore.getLocaleData)('en').long.now;
    var currentSecondMessage = (0, _LocaleDataStore.getLocaleData)('en').long.second.current;
    delete (0, _LocaleDataStore.getLocaleData)('en').long.now;
    delete (0, _LocaleDataStore.getLocaleData)('en').long.second.current;
    timeAgo.format(now, {
      now: now
    }).should.equal(''); // Restore 'now' unit formating rule

    (0, _LocaleDataStore.getLocaleData)('en').long.now = justNowFormatter;
    (0, _LocaleDataStore.getLocaleData)('en').long.second.current = currentSecondMessage;
  });
  it("should format for a style with \"custom\" function", function () {
    var timeAgo = new _JavascriptTimeAgo.default('en'); // `custom` returns a string

    timeAgo.format(Date.now(), {
      custom: function custom(_ref) {
        var now = _ref.now,
            time = _ref.time,
            date = _ref.date,
            locale = _ref.locale;
        return locale;
      }
    }).should.equal('en'); // `custom` returns `undefined`

    timeAgo.format(Date.now(), {
      custom: function custom(_ref2) {
        var now = _ref2.now,
            time = _ref2.time,
            date = _ref2.date,
            locale = _ref2.locale;
        return;
      }
    }).should.equal('now');
  });
  it("should format time correctly for English language (short)", function () {
    convenientGradationTest(['now', '1 min. ago', '2 min. ago', '5 min. ago', '10 min. ago', '15 min. ago', '20 min. ago', '25 min. ago', '30 min. ago', '35 min. ago', '40 min. ago', '45 min. ago', '50 min. ago', '1 hr. ago', '2 hr. ago', '3 hr. ago', '4 hr. ago', '5 hr. ago', '6 hr. ago', '7 hr. ago', '8 hr. ago', '9 hr. ago', '10 hr. ago', '11 hr. ago', '12 hr. ago', '13 hr. ago', '14 hr. ago', '15 hr. ago', '16 hr. ago', '17 hr. ago', '18 hr. ago', '19 hr. ago', '20 hr. ago', '1 day ago', '2 days ago', '3 days ago', '4 days ago', '5 days ago', '1 wk. ago', '2 wk. ago', '3 wk. ago', '1 mo. ago', '2 mo. ago', '3 mo. ago', '4 mo. ago', '5 mo. ago', '6 mo. ago', '7 mo. ago', '8 mo. ago', '9 mo. ago', '9 mo. ago', '10 mo. ago', '1 yr. ago', '2 yr. ago', '3 yr. ago', '100 yr. ago'], 'en', {
      flavour: 'short'
    });
  });
  it("should format time correctly for English language (long)", function () {
    convenientGradationTest(['just now', 'a minute ago', '2 minutes ago', '5 minutes ago', '10 minutes ago', '15 minutes ago', '20 minutes ago', '25 minutes ago', '30 minutes ago', '35 minutes ago', '40 minutes ago', '45 minutes ago', '50 minutes ago', 'an hour ago', '2 hours ago', '3 hours ago', '4 hours ago', '5 hours ago', '6 hours ago', '7 hours ago', '8 hours ago', '9 hours ago', '10 hours ago', '11 hours ago', '12 hours ago', '13 hours ago', '14 hours ago', '15 hours ago', '16 hours ago', '17 hours ago', '18 hours ago', '19 hours ago', '20 hours ago', 'a day ago', '2 days ago', '3 days ago', '4 days ago', '5 days ago', 'a week ago', '2 weeks ago', '3 weeks ago', 'a month ago', '2 months ago', '3 months ago', '4 months ago', '5 months ago', '6 months ago', '7 months ago', '8 months ago', '9 months ago', '9 months ago', '10 months ago', 'a year ago', '2 years ago', '3 years ago', '100 years ago'], 'en', _style.defaultStyle);
  });
  it("should format time correctly for Russian language (short)", function () {
    convenientGradationTest(['сейчас', '1 мин. назад', '2 мин. назад', '5 мин. назад', '10 мин. назад', '15 мин. назад', '20 мин. назад', '25 мин. назад', '30 мин. назад', '35 мин. назад', '40 мин. назад', '45 мин. назад', '50 мин. назад', '1 ч. назад', '2 ч. назад', '3 ч. назад', '4 ч. назад', '5 ч. назад', '6 ч. назад', '7 ч. назад', '8 ч. назад', '9 ч. назад', '10 ч. назад', '11 ч. назад', '12 ч. назад', '13 ч. назад', '14 ч. назад', '15 ч. назад', '16 ч. назад', '17 ч. назад', '18 ч. назад', '19 ч. назад', '20 ч. назад', '1 дн. назад', '2 дн. назад', '3 дн. назад', '4 дн. назад', '5 дн. назад', '1 нед. назад', '2 нед. назад', '3 нед. назад', '1 мес. назад', '2 мес. назад', '3 мес. назад', '4 мес. назад', '5 мес. назад', '6 мес. назад', '7 мес. назад', '8 мес. назад', '9 мес. назад', '9 мес. назад', '10 мес. назад', '1 г. назад', '2 г. назад', '3 г. назад', '100 л. назад'], 'ru', {
      flavour: 'short'
    });
  });
  it("should format time correctly for Russian language (long)", function () {
    convenientGradationTest(['только что', '1 минуту назад', '2 минуты назад', '5 минут назад', '10 минут назад', '15 минут назад', '20 минут назад', '25 минут назад', '30 минут назад', '35 минут назад', '40 минут назад', '45 минут назад', '50 минут назад', '1 час назад', '2 часа назад', '3 часа назад', '4 часа назад', '5 часов назад', '6 часов назад', '7 часов назад', '8 часов назад', '9 часов назад', '10 часов назад', '11 часов назад', '12 часов назад', '13 часов назад', '14 часов назад', '15 часов назад', '16 часов назад', '17 часов назад', '18 часов назад', '19 часов назад', '20 часов назад', '1 день назад', '2 дня назад', '3 дня назад', '4 дня назад', '5 дней назад', '1 неделю назад', '2 недели назад', '3 недели назад', '1 месяц назад', '2 месяца назад', '3 месяца назад', '4 месяца назад', '5 месяцев назад', '6 месяцев назад', '7 месяцев назад', '8 месяцев назад', '9 месяцев назад', '9 месяцев назад', '10 месяцев назад', '1 год назад', '2 года назад', '3 года назад', '100 лет назад'], 'ru', _style.defaultStyle);
  });
  it("should format future dates", function () {
    new _JavascriptTimeAgo.default('en').format(Date.now() + 60 * 60 * 1000).should.equal('in an hour');
    new _JavascriptTimeAgo.default('ru').format(Date.now() + 45.1 * 1000).should.equal('через 1 минуту');
  });
  it("should have generated missing quantifier functions", function () {
    new _JavascriptTimeAgo.default('ccp').format(Date.now() + 60 * 1000).should.equal('1 𑄟𑄨𑄚𑄨𑄘𑄬');
  });
  it("should throw for non-existing locales", function () {
    (function () {
      return _JavascriptTimeAgo.default.addLocale();
    }).should.throw('No locale data passed');
  });
});

function convenientGradationTest(convenientGradationLabels, timeAgo) {
  var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (typeof timeAgo === 'string') {
    timeAgo = new _JavascriptTimeAgo.default(timeAgo);
  }

  var now = Date.now();

  var elapsed = function elapsed(time) {
    return timeAgo.format(now - time * 1000, _objectSpread({
      now: now
    }, style));
  };

  if (convenientGradation.length !== convenientGradationLabels.length) {
    throw new Error("Array length mismatch. Gradation steps: ".concat(convenientGradation.length, ", labels: ").concat(convenientGradationLabels.length));
  }

  var i = 0;

  while (i < convenientGradation.length) {
    for (var _iterator = convenientGradation[i], _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref3 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref3 = _i.value;
      }

      var time = _ref3;
      elapsed(time).should.equal(convenientGradationLabels[i]);
    }

    i++;
  }
}

var convenientGradation = [// 'just now':
[0, 44.9], // 'a minute ago':
[45.1, 1.49 * 60], // '2 minutes ago':
[1.51 * 60, 2.49 * 60], // '5 minutes ago':
[2.51 * 60, 7.49 * 60], // '10 minutes ago':
[7.51 * 60, 12.49 * 60], // '15 minutes ago':
[12.51 * 60, 17.49 * 60], // '20 minutes ago':
[17.51 * 60, 22.49 * 60], // '25 minutes ago':
[22.51 * 60, 27.49 * 60], // '30 minutes ago':
[27.51 * 60, 32.49 * 60], // '35 minutes ago':
[32.51 * 60, 37.49 * 60], // '40 minutes ago':
[37.51 * 60, 42.49 * 60], // '45 minutes ago':
[42.51 * 60, 47.49 * 60], // '50 minutes ago':
[47.51 * 60, 52.49 * 60], // 'an hour ago':
[55.01 * 60, 1.49 * 60 * 60], // '2 hours ago':
[1.51 * 60 * 60, 2.49 * 60 * 60], // '3 hours ago':
[2.51 * 60 * 60, 3.49 * 60 * 60], // '4 hours ago':
[3.51 * 60 * 60, 4.49 * 60 * 60], // '5 hours ago':
[4.51 * 60 * 60, 5.49 * 60 * 60], // '6 hours ago':
[5.51 * 60 * 60, 6.49 * 60 * 60], // '7 hours ago':
[6.51 * 60 * 60, 7.49 * 60 * 60], // '8 hours ago':
[7.51 * 60 * 60, 8.49 * 60 * 60], // '9 hours ago':
[8.51 * 60 * 60, 9.49 * 60 * 60], // '10 hours ago':
[9.51 * 60 * 60, 10.49 * 60 * 60], // '11 hours ago':
[10.51 * 60 * 60, 11.49 * 60 * 60], // '12 hours ago':
[11.51 * 60 * 60, 12.49 * 60 * 60], // '13 hours ago':
[12.51 * 60 * 60, 13.49 * 60 * 60], // '14 hours ago':
[13.51 * 60 * 60, 14.49 * 60 * 60], // '15 hours ago':
[14.51 * 60 * 60, 15.49 * 60 * 60], // '16 hours ago':
[15.51 * 60 * 60, 16.49 * 60 * 60], // '17 hours ago':
[16.51 * 60 * 60, 17.49 * 60 * 60], // '18 hours ago':
[17.51 * 60 * 60, 18.49 * 60 * 60], // '19 hours ago':
[18.51 * 60 * 60, 19.49 * 60 * 60], // '20 hours ago':
[19.51 * 60 * 60, 20.49 * 60 * 60], // 'a day ago':
[20.51 * 60 * 60, 1.49 * _gradation.day], // '2 days ago':
[1.51 * _gradation.day, 2.49 * _gradation.day], // '3 days ago':
[2.51 * _gradation.day, 3.49 * _gradation.day], // '4 days ago':
[3.51 * _gradation.day, 4.49 * _gradation.day], // '5 days ago':
[4.51 * _gradation.day, 5.49 * _gradation.day], // 'a week ago':
[5.51 * _gradation.day, 1.49 * 7 * _gradation.day], // '2 weeks ago':
[1.51 * 7 * _gradation.day, 2.49 * 7 * _gradation.day], // '3 weeks ago':
[2.51 * 7 * _gradation.day, 3.49 * 7 * _gradation.day], // 'a month ago':
[3.51 * 7 * _gradation.day, 1.49 * _gradation.month], // '2 months ago':
[1.51 * _gradation.month, 2.49 * _gradation.month], // '3 months ago':
[2.51 * _gradation.month, 3.49 * _gradation.month], // '4 months ago':
[3.51 * _gradation.month, 4.49 * _gradation.month], // '5 months ago':
[4.51 * _gradation.month, 5.49 * _gradation.month], // '6 months ago':
[5.51 * _gradation.month, 6.49 * _gradation.month], // '7 months ago':
[6.51 * _gradation.month, 7.49 * _gradation.month], // '8 months ago':
[7.51 * _gradation.month, 8.49 * _gradation.month], // '9 months ago':
[8.51 * _gradation.month, 8.99 * _gradation.month], // '9 months ago':
[9.01 * _gradation.month, 9.49 * _gradation.month], // '10 months ago':
[9.51 * _gradation.month, 10.49 * _gradation.month], // 'a year ago':
[10.51 * _gradation.month, 1.49 * _gradation.year], // '2 years ago':
[1.51 * _gradation.year, 2.49 * _gradation.year], // '3 years ago':
[2.51 * _gradation.year, 3.49 * _gradation.year], // '100 years ago':
[99.51 * _gradation.year, 100.49 * _gradation.year]];
//# sourceMappingURL=JavascriptTimeAgo.test.js.map