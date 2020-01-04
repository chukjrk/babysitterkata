export const fee = (start, end, family) => {
  var checkStartPm = start.search("pm");
  var checkEndPm = end.search("am");
  const earliestStart = 17;
  const latestEnd = 4;

  var { startTime, endTime } = timeConvert(start, end);

  if (checkStartPm > 0 && startTime < earliestStart) {
    return ["Cannot start before 5:00pm", "Mistake made with entry"];
  } else if (checkStartPm < 0 && startTime > latestEnd) {
    return ["Cannot start before 5:00pm", "Mistake made with entry"];
  }
  if (checkEndPm > 0 && endTime > latestEnd) {
    return ["Cannot leave later than 4:00am", "Mistake made with entry"];
  } else if (checkEndPm < 0 && endTime < earliestStart) {
    return ["Cannot leave later than 4:00am", "Mistake made with entry"];
  }
  if (typeof family !== "string" && family.length > 1) {
    return "Can only babysit for one family";
  }
};

export const timeConvert = (start, end) => {
  start = start.replace(":", ".");
  end = end.replace(":", ".");
  var endInt = parseInt(end);
  var startInt = parseInt(start);
  var checkStartPm = start.search("pm");
  var checkEndPm = end.search("am");
  var twelfthHour = 12;

  if (checkStartPm > 0 && startInt !== twelfthHour) {
    var startFloat = parseFloat(start);
    var startTime = startFloat + twelfthHour;
  } else if (checkStartPm < 0 && startInt == twelfthHour) {
    var startFloat = parseFloat(start);
    var startTime = startFloat - twelfthHour;
  } else {
    var startTime = parseFloat(start);
  }

  if (checkEndPm > 0 && endInt == twelfthHour) {
    var endFloat = parseFloat(end);
    var endTime = endFloat - twelfthHour;
  } else if (checkEndPm < 0 && endInt !== twelfthHour) {
    var endFloat = parseFloat(end);
    var endTime = endFloat + twelfthHour;
  } else {
    var endTime = parseFloat(end);
  }

  return { startTime, endTime };
};
