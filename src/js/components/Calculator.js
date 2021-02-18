import React, {useEffect} from 'react';
import { useSelector } from "react-redux";
import RiskLevelOverview from './RiskSelector/RiskLevelOverview';
import RiskCalculator from './RiskCalculator/RiskCalculator';

const Calculator = (props) => {
  const activeRiskLevel = useSelector(state => state.riskLevels.activeRiskLevel);
  
  useEffect(() => {
    window.onbeforeunload = function() { 
      setTimeout(function () { 
        window.location = '/';
    }, 0); 

    // necessary to prevent infinite loop
    window.onbeforeunload = null; 
    }
  }, [])


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