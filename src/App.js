export const fee = start => {
  var checkStartPm = start.search("pm");

  var startTime = timeConvert(start);

  if (checkStartPm > 0 && startTime < 17) {
    return ["Cannot start before 5:00pm", "Mistake made with entry"];
  } else if (checkStartPm < 0 && startTime > 4) {
    return ["Cannot start before 5:00pm", "Mistake made with entry"];
  }
};

export const timeConvert = start => {
  start = start.replace(":", ".");
  var startInt = parseInt(start);
  var checkStartPm = start.search("pm");
  if (checkStartPm > 0 && startInt !== 12) {
    var startFloat = parseFloat(start);
    var startTime = startFloat + 12;
  } else if (checkStartPm < 0 && startInt == 12) {
    var startFloat = parseFloat(start);
    var startTime = startFloat - 12;
  } else {
    var startTime = parseFloat(start);
  }

  return startTime;
};
