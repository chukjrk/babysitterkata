export const fee = (start, end) => {
  var checkStartPm = start.search("pm");
  var checkEndPm = end.search("am");

  var { startTime, endTime } = timeConvert(start, end);

  if (checkStartPm > 0 && startTime < 17) {
    return ["Cannot start before 5:00pm", "Mistake made with entry"];
  } else if (checkStartPm < 0 && startTime > 4) {
    return ["Cannot start before 5:00pm", "Mistake made with entry"];
  }
  if (checkEndPm > 0 && endTime > 4) {
    return ["Cannot leave later than 4:00am", "Mistake made with entry"];
  } else if (checkEndPm < 0 && endTime < 17) {
    return ["Cannot leave later than 4:00am", "Mistake made with entry"];
  }
};

export const timeConvert = (start, end) => {
  start = start.replace(":", ".");
  end = end.replace(":", ".");
  var endInt = parseInt(end);
  var startInt = parseInt(start);
  var checkStartPm = start.search("pm");
  var checkEndPm = end.search("am");
  if (checkStartPm > 0 && startInt !== 12) {
    var startFloat = parseFloat(start);
    var startTime = startFloat + 12;
  } else if (checkStartPm < 0 && startInt == 12) {
    var startFloat = parseFloat(start);
    var startTime = startFloat - 12;
  } else {
    var startTime = parseFloat(start);
  }
  if (checkEndPm > 0 && endInt == 12) {
    var endFloat = parseFloat(end);
    var endTime = endFloat - 12;
  } else if (checkEndPm < 0 && endInt !== 12) {
    var endFloat = parseFloat(end);
    var endTime = endFloat + 12;
  } else {
    var endTime = parseFloat(end);
  }
  return { startTime, endTime };
};
