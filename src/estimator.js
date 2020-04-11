const getDuration = (periodType, timeToElapse) => {
  let duration;
  switch (periodType) {
    case 'days': {
      duration = timeToElapse;
      return duration;
    }
    case 'weeks': {
      duration = 7 * timeToElapse;
      return duration;
    }
    case 'months': {
      duration = 30 * timeToElapse;
      return duration;
    }
    default:
  }
  return duration;
};

const computeInfectedAndRequestTime = (reportedCases, factor, duration) => {
  const currentlyInfected = reportedCases * factor;
  const dayQuocent = parseInt(duration / 3, 10);
  const infectionsByRequestedTime = currentlyInfected * 2 ** dayQuocent;
  return {
    currentlyInfected,
    infectionsByRequestedTime
  };
};

// challange 3 function
const computeCasesAndDollarFlight = (
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

const forChallangeOne = (data, duration) => {
  const { reportedCases } = data;
  const impact = computeInfectedAndRequestTime(reportedCases, 10, duration);
  const severeImpact = computeInfectedAndRequestTime(
    reportedCases,
    50,
    duration
  );
  return { impact, severeImpact };
};

const computeSCandHB = (infectionsByRequestedTime, totalBeds) => {
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

const covid19ImpactEstimator = (data) => {
  const {
    periodType,
    timeToElapse,
    totalHospitalBeds,
    region: { avgDailyIncomeInUSD, avgDailyIncomePopulation }
  } = data;
  const duration = getDuration(periodType, timeToElapse);

  // challange 1
  let { impact, severeImpact } = forChallangeOne(data, duration);

  // challange 2
  const forImpact = computeSCandHB(
    impact.infectionsByRequestedTime,
    totalHospitalBeds
  );
  impact.severeCasesByRequestedTime = forImpact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = forImpact.hospitalBedsByRequestedTime;

  const forSevere = computeSCandHB(
    severeImpact.infectionsByRequestedTime,
    totalHospitalBeds
  );
  severeImpact.severeCasesByRequestedTime = forSevere.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = forSevere.hospitalBedsByRequestedTime;

  // challange 3
  const casesAndDollarsFlightImplact = computeCasesAndDollarFlight(
    impact.infectionsByRequestedTime,
    avgDailyIncomeInUSD,
    duration,
    avgDailyIncomePopulation
  );

  const casesAndDollarsFlightSevere = computeCasesAndDollarFlight(
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
