export const fee = (start, end, family) => {
  var checkStartPm = start.search("pm");
  var checkEndPm = end.search("am");
  const earliestStart = 17;
  const latestEnd = 4;
  var firstPayment = 0;
  var secondPayment = 0;
  var thirdPayment = 0;

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

  switch (family) {
    case "Family A":
      // $15 per hour before 11pm and $20 per hour the rest of the night
      var firstPayRate = 15;
      var secondPayRate = 20;
      var timeRateChng = 23;

      var { firstPayment, secondPayment } = payRateFamAC(
        startTime,
        endTime,
        timeRateChng,
        checkStartPm,
        checkEndPm,
        firstPayRate,
        secondPayRate
      );

      var totalpayment = firstPayment + secondPayment;

      return totalpayment;

    case "Family B":
      // $12 per hour before 10pm and $8 between 10pm and 12am and $16 the rest of the night
      if (startTime <= 22) {
        var firstDiff = Math.abs(22 - startTime);
        var roundedFirst = roundTime(firstDiff);
        var firstPayment = roundedFirst * 12;
      }
      if (startTime <= 22 && endTime > 0) {
        var secondDiff = 12 - 10;
        var roundedSecond = roundTime(secondDiff);
        var secondPayment = roundedSecond * 8;
      }
      if (startTime >= 22 && checkStartPm > 0) {
        var secondDiff = Math.abs(startTime - 22);
        var roundedSecond = roundTime(secondDiff);
        var secondPayment = roundedSecond * 8;
      } else if (endTime >= 22 && checkEndPm < 0) {
        var secondDiff = Math.abs(endTime - 22);
        var roundedSecond = roundTime(secondDiff);
        var secondPayment = roundedSecond * 8;
      }

      if (endTime > 0 && checkEndPm > 0) {
        var thirdDiff = Math.abs(endTime - 0);
        var roundedThird = roundTime(thirdDiff);
        var thirdPayment = roundedThird * 16;
      }

      var totalpayment = firstPayment + secondPayment + thirdPayment;

      return totalpayment;

    case "Family C":
      // $21 per hour before 9pm and $15 rest of the night
      var firstPayRate = 21;
      var secondPayRate = 15;
      var timeRateChng = 21;

      var { firstPayment, secondPayment } = payRateFamAC(
        startTime,
        endTime,
        timeRateChng,
        checkStartPm,
        checkEndPm,
        firstPayRate,
        secondPayRate
      );

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

export const roundTime = timeDiff => {
  if (timeDiff % 1 < 0.3) {
    var roundedTime = Math.floor(timeDiff);
    return roundedTime;
  } else if (timeDiff % 1 >= 0.3) {
    var roundedTime = Math.ceil(timeDiff);
    return roundedTime;
  }
};

export const payRateFamAC = (
  startTime,
  endTime,
  timeRateChng,
  checkStartPm,
  checkEndPm,
  firstPayRate,
  secondPayRate
) => {
  var timeChngDiff = 24 - timeRateChng;
  if (startTime < timeRateChng && checkStartPm > 0) {
    var firstDiff = Math.abs(timeRateChng - startTime);
    var roundedFirst = roundTime(firstDiff);
    var firstPayment = roundedFirst * firstPayRate;
  } else if (startTime > timeRateChng && checkStartPm > 0) {
    var firstDiff = Math.abs(24 - startTime);
    var roundedFirst = roundTime(firstDiff);
    var firstPayment = roundedFirst * secondPayRate;
  }
  if (endTime >= timeRateChng && checkEndPm < 0) {
    var secondDiff = Math.abs(endTime - timeRateChng);
    var roundedSecond = roundTime(secondDiff);
    var secondPayment = roundedSecond * secondPayRate;
  } else if (endTime > timeRateChng && checkEndPm > 0) {
    var secondDiff = Math.abs(endTime);
    var roundedSecond = roundTime(secondDiff);
    var secondPayment = roundedSecond * secondPayRate;
  } else if (endTime < timeRateChng && checkEndPm > 0) {
    var secondDiff = Math.abs(endTime + timeChngDiff);
    var roundedSecond = roundTime(secondDiff);
    var secondPayment = roundedSecond * secondPayRate;
  }
  return { firstPayment, secondPayment };
};
