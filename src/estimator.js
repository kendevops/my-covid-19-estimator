const calInfectedAndRequestTime = (reportedCases, factor, duration) => {
  const currentlyInfected = reportedCases * factor;
  const dayQuocent = parseInt(duration / 3, 10);
  const infectionsByRequestedTime = currentlyInfected * 2 ** dayQuocent;
  return {
    currentlyInfected,
    infectionsByRequestedTime
  };
};

const calDuration = (periodType, timeToElapse) => {
  let duration;
  switch (periodType) {
    case 'days': {
      duration = timeToElapse;
      return duration;
    }
    case 'weeks': {
      duration = timeToElapse * 7;
      return duration;
    }
    case 'months': {
      duration = timeToElapse * 30;
      return duration;
    }
    default:
  }
  return duration;
};

const challangeOneCal = (data, duration) => {
  const { reportedCases } = data;
  const impact = calInfectedAndRequestTime(reportedCases, 10, duration);
  const severeImpact = calInfectedAndRequestTime(reportedCases, 50, duration);
  return { impact, severeImpact };
};

const calSCandHB = (infectionsByRequestedTime, totalBeds) => {
  const severeCasesByRequestedTime = infectionsByRequestedTime * (15 / 100);
  const availableBeds = totalBeds * (35 / 100);
  let hospitalBedsByRequestedTime;
  if (severeCasesByRequestedTime > availableBeds) {
    hospitalBedsByRequestedTime = parseInt(
      availableBeds - severeCasesByRequestedTime,
      10
    );
  } else {
    hospitalBedsByRequestedTime = parseInt(availableBeds, 10);
  }
  return {
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };
};

// challange 3 function
const calCasesAndDollarFlight = (
  infectionsByRequestedTime,
  avgDailyIncomeInUSD,
  duration,
  avgDailyIncomePopulation
) => {
  const casesForICUByRequestedTime = parseInt(
    infectionsByRequestedTime * (5 / 100),
    10
  );
  const casesForVentilatorsByRequestedTime = parseInt(
    infectionsByRequestedTime * (2 / 100),
    10
  );
  const dollarValue = (infectionsByRequestedTime
      * avgDailyIncomePopulation
      * avgDailyIncomeInUSD)
    / duration;
  const dollarsInFlight = parseInt(dollarValue, 10);
  return {
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const covid19ImpactEstimator = (data) => {
  const {
    periodType,
    timeToElapse,
    totalHospitalBeds,
    region: { avgDailyIncomeInUSD, avgDailyIncomePopulation }
  } = data;
  const duration = calDuration(periodType, timeToElapse);

  // Calculating the value for challenge 1
  let { impact, severeImpact } = challangeOneCal(data, duration);

  // Calculating the value for Challenge 2
  const impactCase = calSCandHB(
    impact.infectionsByRequestedTime,
    totalHospitalBeds
  );
  impact.severeCasesByRequestedTime = impactCase.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = impactCase.hospitalBedsByRequestedTime;

  const severeCase = calSCandHB(
    severeImpact.infectionsByRequestedTime,
    totalHospitalBeds
  );
  severeImpact.severeCasesByRequestedTime = severeCase.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = severeCase.hospitalBedsByRequestedTime;

  // challange 3
  const casesAndDollarsFlightImplact = calCasesAndDollarFlight(
    impact.infectionsByRequestedTime,
    avgDailyIncomeInUSD,
    duration,
    avgDailyIncomePopulation
  );

  const casesAndDollarsFlightSevere = calCasesAndDollarFlight(
    severeImpact.infectionsByRequestedTime,
    avgDailyIncomeInUSD,
    duration,
    avgDailyIncomePopulation
  );

  impact = { ...impact, ...casesAndDollarsFlightImplact };
  severeImpact = { ...severeImpact, ...casesAndDollarsFlightSevere };

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
