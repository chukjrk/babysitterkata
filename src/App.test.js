import { fee, timeConvert } from "./App";

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
});
