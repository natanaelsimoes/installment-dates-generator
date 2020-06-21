let _startDate, _payDay, _installments;

function isInt(value) {
    var x;
    return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
}

function lastDate(month, year) {
    return (new Date(year, month + 1, 0)).getDate();
}

function validateParams(startDate, dayToPay, installments) {
    if (typeof startDate === 'number' && startDate >= 0)
        _startDate = new Date(startDate);
    else if (typeof startDate === 'object'
        && startDate.constructor.name === 'Date')
        _startDate = new Date(startDate.getTime());
    else throw 'Start date is not a valid date';
    if (!isInt(dayToPay))
        throw 'Day to pay needs to be an integer';
    _payDay = parseInt(dayToPay);
    if (_payDay < 1 || _payDay > 31)
        throw 'Day to pay needs to be between 1 and 31 (inclusive)';
    if (!isInt(installments))
        throw 'Installments needs to be an integer';
    _installments = parseInt(installments);
    if (_installments < 1)
        throw 'Installments needs to be greater or equal to 1';
}

function InstallmentDates(startDate, payDay, installments) {
    let lastDay, dates = [];
    validateParams(startDate, payDay, installments);
    if (_startDate.getDate() > _payDay) {
        lastDay = lastDate(_startDate.getMonth() + 1, _startDate.getFullYear());
        _startDate.setDate(_payDay <= lastDay ? _payDay : lastDay);
        _startDate.setMonth(_startDate.getMonth() + 1);
    } else {
        lastDay = lastDate(_startDate.getMonth(), _startDate.getFullYear());
        _startDate.setDate(_payDay <= lastDay ? _payDay : lastDay);
    }
    for (let i = 0; i < installments; i++) {
        const current = new Date(_startDate.getTime());
        dates.push(current);
        lastDay = lastDate(_startDate.getMonth() + 1, _startDate.getFullYear());
        _startDate.setDate(1);
        _startDate.setMonth(_startDate.getMonth() + 1);
        _startDate.setDate(_payDay <= lastDay ? _payDay : lastDay);
    }
    return dates;
}

module.exports = InstallmentDates;