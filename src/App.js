export const fee = (start, end, family) => {
  var checkStartPm = start.search("pm");
  var checkEndAm = end.search("am");
  var firstPayment = 0;
  var secondPayment = 0;
  var thirdPayment = 0;
  var totalpayment = 0;

  var { startTime, endTime } = timeConvert(start, end);

  if (checkStartPm > 0 && startTime < 17) {
    return ["Cannot start before 5:00pm", "Mistake made with entry"];
  } else if (checkStartPm < 0 && startTime > 4) {
    return ["Cannot start before 5:00pm", "Mistake made with entry"];
  }

  if (checkEndAm > 0 && endTime > 4) {
    return ["Cannot leave later than 4:00am", "Mistake made with entry"];
  } else if (checkEndAm < 0 && endTime < 17) {
    return ["Cannot leave later than 4:00am", "Mistake made with entry"];
  }

  if (typeof family !== "string" && family.length > 1) {
    return "Can only babysit for one family";
  }

  switch (family) {
    case "Family A":
      // $15 per hour before 11pm and $20 per hour the rest of the night
      var firstPayRate = 15;
      var secondPayRate = 20;
      var timeRateChng = 23;
      var timeChngDiff = 24 - timeRateChng;

      if (checkStartPm > 0 && checkEndAm < 0) {
        var firstDiff = Math.abs(endTime - startTime);
        var roundedFirst = roundTime(firstDiff);
        var firstPayment = roundedFirst * firstPayRate;
      }

      if (checkStartPm < 0 && checkEndAm > 0) {
        var secondDiff = Math.abs(endTime - startTime);
        var roundedSecond = roundTime(secondDiff);
        var secondPayment = roundedSecond * secondPayRate;
      }

      var totalpayment = firstPayment + secondPayment;

      return totalpayment;

    default:
      return "Mistake made with entry";
  }
};

export const timeConvert = (start, end) => {
  start = start.replace(":", ".");
  end = end.replace(":", ".");
  var endInt = parseInt(end);
  var startInt = parseInt(start);
  var checkStartPm = start.search("pm");
  var checkEndAm = end.search("am");
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

  if (checkEndAm > 0 && endInt == twelfthHour) {
    var endFloat = parseFloat(end);
    var endTime = endFloat - twelfthHour;
  } else if (checkEndAm < 0 && endInt !== twelfthHour) {
    var endFloat = parseFloat(end);
    var endTime = endFloat + twelfthHour;
  } else {
    var endTime = parseFloat(end);
  }

  return { startTime, endTime };
};

export const roundTime = timeDiff => {
  if (timeDiff % 1 < 0.3) {
    var roundedTime = Math.floor(timeDiff);
    return roundedTime;
  } else if (timeDiff % 1 >= 0.3) {
    var roundedTime = Math.ceil(timeDiff);
    return roundedTime;
  }
};
