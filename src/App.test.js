import { fee } from "./App";

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
  it("total price should be 16", () => {
    var family = "Family B";
    var start = "10:12pm";
    var end = "12:00am";
    expect(fee(start, end, family)).toBe(16);
  });
  it("total price should be 16", () => {
    var family = "Family B";
    var start = "10:12pm";
    var end = "11:00pm";
    expect(fee(start, end, family)).toBe(8);
  });
  it("total price should be 68", () => {
    var family = "Family B";
    var start = "5:12pm";
    var end = "11:00pm";
    expect(fee(start, end, family)).toBe(68);
  });
  it("total price should be 140", () => {
    var family = "Family B";
    var start = "5:00pm";
    var end = "4:00am";
    expect(fee(start, end, family)).toBe(140);
  });
  it("total price should be 72", () => {
    var family = "Family B";
    var start = "11:00pm";
    var end = "4:00am";
    expect(fee(start, end, family)).toBe(72);
  });
});
