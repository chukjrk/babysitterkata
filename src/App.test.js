import { fee, timeConvert } from "./App";

describe("timeConvert", () => {
  it("should convert start time to a number", () => {
    var start = "5:15pm";
    var end = "3:10am";
    expect(typeof timeConvert(start, end).startTime).toEqual("number");
  });
  it("start time should be less than 24 hours", () => {
    var start = "5:15pm";
    var end = "3:10am";
    expect(timeConvert(start, end).startTime).toBeLessThan(24);
  });
  it("start time should be more than 0 hours", () => {
    var start = "5:15pm";
    var end = "3:10am";
    expect(timeConvert(start, end).startTime).toBeGreaterThanOrEqual(0);
  });
  it("should convert end time to a number", () => {
    var start = "5:15pm";
    var end = "3:10am";
    expect(typeof timeConvert(start, end).endTime).toEqual("number");
  });
  it("end time should be less than 24 hours", () => {
    var start = "5:15pm";
    var end = "3:10am";
    expect(timeConvert(start, end).endTime).toBeLessThan(24);
  });
  it("end time should be more than 0 hours", () => {
    var start = "5:15pm";
    var end = "3:10am";
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
});
