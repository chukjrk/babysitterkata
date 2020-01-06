export const fee = (start, end, family) => {
  var checkStartPm = start.search("pm");
  var checkEndAm = end.search("am");
  var firstPayment = 0;
  var secondPayment = 0;
  var thirdPayment = 0;
  var earliestStart = 17;
  var latestEnd = 4;

  var { startTime, endTime } = timeConvert(start, end);

  if (checkStartPm > 0 && startTime < earliestStart) {
    return ["Cannot start before 5:00pm", "Mistake made with entry"];
  } else if (checkStartPm < 0 && startTime > latestEnd) {
    return ["Cannot start before 5:00pm", "Mistake made with entry"];
  }

  if (checkEndAm > 0 && endTime > latestEnd) {
    return ["Cannot leave later than 4:00am", "Mistake made with entry"];
  } else if (checkEndAm < 0 && endTime < earliestStart) {
    return ["Cannot leave later than 4:00am", "Mistake made with entry"];
  }

  if (typeof family !== "string" && family.length > 1) {
    return "Can only babysit for one family";
  }

  switch (family) {
    case "Family A":
      // $15 per hour before 11pm and $20 per hour the rest of the night

      var totalpayment = paymentFamAC(startTime, endTime);

      return totalpayment;

    case "Family B":
      // $12 per hour before 10pm and $8 between 10pm and 12am and $16 the rest of the night
      var firstPayRate = 12;
      var secondPayRate = 8;
      var thirdPayRate = 16;
      var timeRateChng1 = 22;
      var timeRateChng2 = 0;

      if (endTime <= timeRateChng1 && endTime > earliestStart) {
        var firstDiff = Math.abs(endTime - startTime);
        var roundedFirst = roundTime(firstDiff);
        var firstPayment = roundedFirst * firstPayRate;
      }
      if (startTime > timeRateChng1) {
        if (endTime == timeRateChng2) {
          var secondDiff = Math.abs(startTime - endTime - 24);
          var roundedSecond = roundTime(secondDiff);
          var secondPayment = roundedSecond * secondPayRate;
        } else if (endTime > startTime) {
          var secondDiff = Math.abs(startTime - endTime);
          var roundedSecond = roundTime(secondDiff);
          var secondPayment = roundedSecond * secondPayRate;
        } else {
          var secondDiff = Math.abs(startTime - timeRateChng2 - 24);
          var roundedSecond = roundTime(secondDiff);
          var secondPayment = roundedSecond * secondPayRate;
          var thirdDiff = Math.abs(endTime - timeRateChng2);
          var roundedThird = roundTime(thirdDiff);
          var thirdPayment = roundedThird * thirdPayRate;
        }
      }

      if (startTime < endTime && startTime < earliestStart) {
        var thirdDiff = Math.abs(startTime - endTime);
        var roundedThird = roundTime(thirdDiff);
        var thirdPayment = roundedThird * thirdPayRate;
      }

      if (startTime < timeRateChng1) {
        if (endTime > timeRateChng1) {
          var firstDiff = Math.abs(timeRateChng1 - startTime);
          var roundedFirst = roundTime(firstDiff);
          var firstPayment = roundedFirst * firstPayRate;
          var secondDiff = Math.abs(endTime - timeRateChng1);
          var roundedSecond = roundTime(secondDiff);
          var secondPayment = roundedSecond * secondPayRate;
        }
        if (endTime < startTime && endTime != timeRateChng2) {
          var firstDiff = Math.abs(timeRateChng1 - startTime);
          var roundedFirst = roundTime(firstDiff);
          var firstPayment = roundedFirst * firstPayRate;
          var secondPayment = 2 * secondPayRate;
          var thirdDiff = Math.abs(endTime - timeRateChng2);
          var roundedThird = roundTime(thirdDiff);
          var thirdPayment = roundedThird * thirdPayRate;
        }
      }

      var totalpayment = firstPayment + secondPayment + thirdPayment;

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

export const paymentFamAC = (startTime, endTime) => {
  var firstPayment = 0;
  var secondPayment = 0;
  var earliestStart = 17;

  var firstPayRate = 15;
  var secondPayRate = 20;
  var timeRateChng = 23;

  if (endTime <= timeRateChng && endTime > earliestStart) {
    var firstDiff = Math.abs(endTime - startTime);
    var roundedFirst = roundTime(firstDiff);
    var firstPayment = roundedFirst * firstPayRate;
  }
  if (startTime >= timeRateChng) {
    var secondDiff = Math.abs(startTime - endTime - 24);
    var roundedSecond = roundTime(secondDiff);
    var secondPayment = roundedSecond * secondPayRate;
  }
  if (startTime < endTime && startTime < earliestStart) {
    var secondDiff = Math.abs(endTime - startTime);
    var roundedSecond = roundTime(secondDiff);
    var firstPayment = roundedSecond * secondPayRate;
  }
  if (startTime < timeRateChng) {
    if (endTime > timeRateChng) {
      var firstDiff = Math.abs(timeRateChng - startTime);
      var roundedFirst = roundTime(firstDiff);
      var firstPayment = roundedFirst * firstPayRate;
      var secondDiff = Math.abs(endTime - timeRateChng);
      var roundedSecond = roundTime(secondDiff);
      var secondPayment = roundedSecond * secondPayRate;
    }
    if (endTime < startTime) {
      var firstDiff = Math.abs(timeRateChng - startTime);
      var roundedFirst = roundTime(firstDiff);
      var firstPayment = roundedFirst * firstPayRate;
      var secondDiff = Math.abs(timeRateChng - endTime - 24);
      var roundedSecond = roundTime(secondDiff);
      var secondPayment = roundedSecond * secondPayRate;
    }
  }
  var totalpayment = firstPayment + secondPayment;
  return totalpayment;
};
