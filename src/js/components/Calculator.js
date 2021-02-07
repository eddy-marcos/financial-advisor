import React from 'react';
import { useSelector } from "react-redux";
import RiskLevelOverview from './RiskSelector/RiskLevelOverview';
import RiskCalculator from './RiskCalculator/RiskCalculator';

const Calculator = (props) => {
  const activeRiskLevel = useSelector(state => state.riskLevels.activeRiskLevel);
  return (
    <div>
      <h2 className="text-center">Personalized Portfolio</h2>
      <h3>Risk Level {activeRiskLevel}</h3>
      <RiskLevelOverview />
      <RiskCalculator />
    </div>
  );
}

export default Calculator;