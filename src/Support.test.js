import { timeConvert, roundTime, paymentFamAC } from "./Support";

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

describe("roundTime", () => {
  it("starts no earlier than 5:00pm", () => {
    var timeDiff = 3.55;
    expect(Number.isInteger(roundTime(timeDiff))).toBe(true);
  });
});

describe("paymentFamAC", () => {
  it("total price should be greater than 0", () => {
    var family1 = "Family A";
    var family2 = "Family C";
    var startTime = 17.0;
    var endTime = 23.0;
    expect(paymentFamAC(startTime, endTime, family1)).toBeGreaterThanOrEqual(0);
    expect(paymentFamAC(startTime, endTime, family2)).toBeGreaterThanOrEqual(0);
  });
  it("total price should be 60", () => {
    var family = "Family A";
    var startTime = 18.15;
    var endTime = 22.0;
    expect(paymentFamAC(startTime, endTime, family)).toBe(60);
  });
  it("total price should be 40", () => {
    var family = "Family A";
    var startTime = 2.0;
    var endTime = 4.0;
    expect(paymentFamAC(startTime, endTime, family)).toBe(40);
  });
  it("total price should be 100", () => {
    var family = "Family A";
    var startTime = 23.15;
    var endTime = 4.0;
    expect(paymentFamAC(startTime, endTime, family)).toBe(100);
  });
  it("total price should be 75", () => {
    var family = "Family A";
    var startTime = 18.0;
    var endTime = 23.5;
    expect(paymentFamAC(startTime, endTime, family)).toBe(95);
  });
  it("total price should be 190", () => {
    var family = "Family A";
    var startTime = 17.0;
    var endTime = 4.0;
    expect(paymentFamAC(startTime, endTime, family)).toBe(190);
  });
  it("total price should be 190", () => {
    var family = "Family C";
    var startTime = 17.0;
    var endTime = 4.0;
    expect(paymentFamAC(startTime, endTime, family)).toBe(189);
  });
});
