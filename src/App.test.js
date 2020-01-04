import { fee, timeConvert, roundTime, payRateFamAC } from "./App";

describe("timeConvert", () => {
  it("should convert start and end times to a number", () => {
    var start = "5:15pm";
    var end = "3:10am";
    expect(typeof timeConvert(start, end).startTime).toEqual("number");
    expect(typeof timeConvert(start, end).endTime).toEqual("number");
  });
  it("start and end times should be less than 24 hours", () => {
    var start = "5:15pm";
    var end = "3:10am";
    expect(timeConvert(start, end).startTime).toBeLessThan(24);
    expect(timeConvert(start, end).endTime).toBeLessThan(24);
  });
  it("start and end times should be more than 0 hours", () => {
    var start = "5:15pm";
    var end = "3:10am";
    expect(timeConvert(start, end).startTime).toBeGreaterThanOrEqual(0);
    expect(timeConvert(start, end).endTime).toBeGreaterThanOrEqual(0);
  });
});

describe("fee", () => {
  it("starts no earlier than 5:00pm", () => {
    var family = "Family A";
    var start = "12:15pm";
    var end = "3:10am";
    expect(fee(start, end, family)).toContain("Cannot start before 5:00pm");
  });
  it("should leave no later than 4:00am", () => {
    var family = "Family A";
    var start = "5:15pm";
    var end = "12:10pm";
    expect(fee(start, end, family)).toContain("Cannot leave later than 4:00am");
  });
  it("can only babysit for one family a night", () => {
    var family = ["Family B", "Family A"];
    var start = "5:15pm";
    var end = "2:10am";
    expect(fee(start, end, family)).toBe("Can only babysit for one family");
  });
  it("should get paid in full hours (no fractional hours allowed)", () => {
    var family = "Family A";
    var start = "5:15pm";
    var end = "3:10am";
    expect(Number.isInteger(fee(start, end, family))).toBe(true);
  });
  it("No mistakes when entering values", () => {
    var family = "Family B";
    var start = "4:15pm";
    var end = "6:10am";
    expect(fee(start, end, family)).toContain("Mistake made with entry");
  });
  it("total price should not be greater", () => {
    var family = "Family A";
    var start = "6:15pm";
    var end = "4:00am";
    if (family == "Family A" || family == "Family C") {
      expect(fee(start, end, family)).toBeLessThanOrEqual(190);
    } else if (family == "Family B") {
      expect(fee(start, end, family)).toBeLessThanorEqual(140);
    }
  });
  it("total price should be greater than 0", () => {
    var family = "Family B";
    var start = "5:00pm";
    var end = "11:00pm";
    expect(fee(start, end, family)).toBeGreaterThanOrEqual(0);
  });
});

describe("roundTime", () => {
  it("starts no earlier than 5:00pm", () => {
    var timeDiff = 3.55;
    expect(Number.isInteger(roundTime(timeDiff))).toBe(true);
  });
});

describe("payRateFamAC", () => {
  it("first and second payment should be greater than or equal to 0", () => {
    var firstPayRate = 21;
    var secondPayRate = 15;
    var timeRateChng = 21;
    var startTime = 17;
    var endTime = 4;
    var start = "5:00pm";
    var end = "4:00am";
    var checkStartPm = start.search("pm");
    var checkEndPm = end.search("am");
    expect(
      payRateFamAC(
        startTime,
        endTime,
        timeRateChng,
        checkStartPm,
        checkEndPm,
        firstPayRate,
        secondPayRate
      ).firstPayment
    ).toBeGreaterThanOrEqual(0);

    expect(
      payRateFamAC(
        startTime,
        endTime,
        timeRateChng,
        checkStartPm,
        checkEndPm,
        firstPayRate,
        secondPayRate
      ).secondPayment
    ).toBeGreaterThanOrEqual(0);
  });
  it("first payment should be less than or equal to 90", () => {
    var firstPayRate = 21;
    var secondPayRate = 15;
    var timeRateChng = 21;
    var startTime = 17;
    var endTime = 4;
    var start = "5:00pm";
    var end = "4:00am";
    var checkStartPm = start.search("pm");
    var checkEndPm = end.search("am");
    expect(
      payRateFamAC(
        startTime,
        endTime,
        timeRateChng,
        checkStartPm,
        checkEndPm,
        firstPayRate,
        secondPayRate
      ).firstPayment
    ).toBeLessThanOrEqual(90);
  });
  it("Second payment should be less than or equal to 105", () => {
    var firstPayRate = 21;
    var secondPayRate = 15;
    var timeRateChng = 21;
    var startTime = 17;
    var endTime = 4;
    var start = "5:00pm";
    var end = "4:00am";
    var checkStartPm = start.search("pm");
    var checkEndPm = end.search("am");
    expect(
      payRateFamAC(
        startTime,
        endTime,
        timeRateChng,
        checkStartPm,
        checkEndPm,
        firstPayRate,
        secondPayRate
      ).firstPayment
    ).toBeLessThanOrEqual(90);
  });
});