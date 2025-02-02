"use strict";

var _time = _interopRequireDefault(require("./time"));

var _JavascriptTimeAgo = require("../JavascriptTimeAgo.test");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('"time" style', function () {
  it('should format "time" style relative time (English)', function () {
    (0, _JavascriptTimeAgo.convenientGradationTest)(['just now', '1 minute', '2 minutes', '5 minutes', '10 minutes', '15 minutes', '20 minutes', '25 minutes', '30 minutes', '35 minutes', '40 minutes', '45 minutes', '50 minutes', '1 hour', '2 hours', '3 hours', '4 hours', '5 hours', '6 hours', '7 hours', '8 hours', '9 hours', '10 hours', '11 hours', '12 hours', '13 hours', '14 hours', '15 hours', '16 hours', '17 hours', '18 hours', '19 hours', '20 hours', '1 day', '2 days', '3 days', '4 days', '5 days', '1 week', '2 weeks', '3 weeks', '1 month', '2 months', '3 months', '4 months', '5 months', '6 months', '7 months', '8 months', '9 months', '9 months', '10 months', '1 year', '2 years', '3 years', '100 years'], 'en-US', _time.default);
  });
  it('should format "time" style relative time (Russian)', function () {
    (0, _JavascriptTimeAgo.convenientGradationTest)(['только что', '1 минута', '2 минуты', '5 минут', '10 минут', '15 минут', '20 минут', '25 минут', '30 минут', '35 минут', '40 минут', '45 минут', '50 минут', '1 час', '2 часа', '3 часа', '4 часа', '5 часов', '6 часов', '7 часов', '8 часов', '9 часов', '10 часов', '11 часов', '12 часов', '13 часов', '14 часов', '15 часов', '16 часов', '17 часов', '18 часов', '19 часов', '20 часов', '1 день', '2 дня', '3 дня', '4 дня', '5 дней', '1 неделю', '2 недели', '3 недели', '1 месяц', '2 месяца', '3 месяца', '4 месяца', '5 месяцев', '6 месяцев', '7 месяцев', '8 месяцев', '9 месяцев', '9 месяцев', '10 месяцев', '1 год', '2 года', '3 года', '100 лет'], 'ru-RU', _time.default);
  });
});
//# sourceMappingURL=time.test.js.map