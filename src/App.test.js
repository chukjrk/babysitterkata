import { fee, timeConvert, roundTime, paymentFamAC } from "./App";

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

  it("total price should be greater than 0", () => {
    var family = "Family B";
    var start = "5:00pm";
    var end = "11:00pm";
    expect(fee(start, end, family)).toBeGreaterThanOrEqual(0);
  });
  it("total price should be 48", () => {
    var family = "Family B";
    var start = "6:15pm";
    var end = "10:00pm";
    expect(fee(start, end, family)).toBe(48);
  });
  it("total price should be 32", () => {
    var family = "Family B";
    var start = "2:12am";
    var end = "4:00am";
    expect(fee(start, end, family)).toBe(32);
  });
});

describe("roundTime", () => {
  it("starts no earlier than 5:00pm", () => {
    var timeDiff = 3.55;
    expect(Number.isInteger(roundTime(timeDiff))).toBe(true);
  });
});

describe("paymentFamAC", () => {
  it("total price should be greater than 0", () => {
    var startTime = 17.0;
    var endTime = 23.0;
    expect(paymentFamAC(startTime, endTime)).toBeGreaterThanOrEqual(0);
  });
  it("total price should be 60", () => {
    var startTime = 18.15;
    var endTime = 22.0;
    expect(paymentFamAC(startTime, endTime)).toBe(60);
  });
  it("total price should be 40", () => {
    var startTime = 2.0;
    var endTime = 4.0;
    expect(paymentFamAC(startTime, endTime)).toBe(40);
  });
  it("total price should be 100", () => {
    var startTime = 23.15;
    var endTime = 4.0;
    expect(paymentFamAC(startTime, endTime)).toBe(100);
  });
  it("total price should be 75", () => {
    var startTime = 18.0;
    var endTime = 23.5;
    expect(paymentFamAC(startTime, endTime)).toBe(95);
  });
  it("total price should be 190", () => {
    var startTime = 17.0;
    var endTime = 4.0;
    expect(paymentFamAC(startTime, endTime)).toBe(190);
  });
});
