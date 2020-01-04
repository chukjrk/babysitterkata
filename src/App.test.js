import { fee, timeConvert } from "./App";

describe("timeConvert", () => {
  it("should convert start time and end time to a number", () => {
    var start = "5:15pm";
    expect(typeof timeConvert(start)).toEqual("number");
  });
  it("start time and end time should be less than 24 hours", () => {
    var start = "5:15pm";
    expect(timeConvert(start)).toBeLessThan(24);
  });
  it("start time and end time should be more than 0 hours", () => {
    var start = "5:15pm";

    expect(timeConvert(start)).toBeGreaterThanOrEqual(0);
  });
});

describe("fee", () => {
  it("starts no earlier than 5:00pm", () => {
    var family = "Family A";
    var start = "12:15pm";
    var end = "3:10am";
    expect(fee(start, end, family)).toContain("Cannot start before 5:00pm");
  });
});
