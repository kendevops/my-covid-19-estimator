const covid19ImpactEstimator = () => {
  const data = {
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

  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * (15 / 100);

  severImpact.severeCasesByRequestedTime = severImpact.infectionsByRequestedTime * (15 / 100);

  const hospitalBedPercent = data.totalHospitalBeds * (35 / 100);

  const impactHospitalBeds = impact.severeCasesByRequestedTime - hospitalBedPercent;

  const severImpactHospitalBeds = severImpact.severeCasesByRequestedTime - hospitalBedPercent;

  impact.hospitalBedsByRequestedTime = Math.floor(impactHospitalBeds);

  severImpact.hospitalBedsByRequestedTime = Math.floor(severImpactHospitalBeds);
};

export default covid19ImpactEstimator;
