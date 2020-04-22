const PaymentDate = require('./InstallmentDates');

describe("Payment date generator", () => {
    it("start date as time", (done) => {
        const dates = PaymentDate(Date.now(), 1, 3);
        expect(typeof dates).toBe('object');
        expect(dates.length).toBe(3);
        done();
    });

    it("day to pay greater than start date day", (done) => {
        const dates = PaymentDate(new Date(2020, 3, 5), 20, 3);
        expect(typeof dates).toBe('object');
        expect(dates.length).toBe(3);
        expect(new Intl.DateTimeFormat('en-US').format(dates[0])).toBe('4/20/2020');
        expect(new Intl.DateTimeFormat('en-US').format(dates[1])).toBe('5/20/2020');
        expect(new Intl.DateTimeFormat('en-US').format(dates[2])).toBe('6/20/2020');
        done();
    });

    it("day to pay less than start date day", (done) => {
        const dates = PaymentDate(new Date(2020, 3, 20), 5, 3);
        expect(typeof dates).toBe('object');
        expect(dates.length).toBe(3);
        expect(new Intl.DateTimeFormat('en-US').format(dates[0])).toBe('5/5/2020');
        expect(new Intl.DateTimeFormat('en-US').format(dates[1])).toBe('6/5/2020');
        expect(new Intl.DateTimeFormat('en-US').format(dates[2])).toBe('7/5/2020');
        done();
    });

    it("day to pay does not exists next month", (done) => {
        const dates = PaymentDate(new Date(2020, 1, 1), 31, 3);
        expect(typeof dates).toBe('object');
        expect(dates.length).toBe(3);
        expect(new Intl.DateTimeFormat('en-US').format(dates[0])).toBe('2/29/2020');
        expect(new Intl.DateTimeFormat('en-US').format(dates[1])).toBe('3/31/2020');
        expect(new Intl.DateTimeFormat('en-US').format(dates[2])).toBe('4/30/2020');
        done();
    });
});