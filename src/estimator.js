const covid19ImpactEstimator = (data) => {
   data = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType: 'days',
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
  };

  const impact = {};
  const severImpact = {};

  impact.currentlyInfected = data.reportedCases * 10;
  severImpact.currentlyInfected = data.reportedCases * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** 9;
  severImpact.infectionsByRequestedTime = severImpact.currentlyInfected * 2 ** 9;
};

export default covid19ImpactEstimator;
