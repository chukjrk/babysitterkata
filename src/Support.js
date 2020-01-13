// ---------------------------------------------------------------------
// timeConvert function to convert time entered in string to a number on
// on the 24 hour clock
// ---------------------------------------------------------------------
export const timeConvert = (start, end) => {
  start = start.replace(":", ".");
  end = end.replace(":", ".");
  var endInt = parseInt(end);
  var startInt = parseInt(start);
  var checkStartPm = start.search("pm");
  var checkEndAm = end.search("am");
  var twelfthHour = 12; // 12am when the 24 hour starts

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

// ---------------------------------------------------------------------
// roundTime function to round the time to the nearest hour
// ---------------------------------------------------------------------
export const roundTime = timeDiff => {
  if (timeDiff % 1 < 0.3) {
    var roundedTime = Math.floor(timeDiff);
    return roundedTime;
  } else if (timeDiff % 1 >= 0.3) {
    var roundedTime = Math.ceil(timeDiff);
    return roundedTime;
  }
};

// ---------------------------------------------------------------------
// paymentFamAC function to calculate the payment for Families A and C
// due of their similarities
// ---------------------------------------------------------------------
export const paymentFamAC = (startTime, endTime, family) => {
  var firstPayment = 0;
  var secondPayment = 0;
  var earliestStart = 17;
  if (family == "Family A") {
    var firstPayRate = 15;
    var secondPayRate = 20;
    var timeRateChng = 23;
  } else {
    var firstPayRate = 21;
    var secondPayRate = 15;
    var timeRateChng = 21;
  }
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
