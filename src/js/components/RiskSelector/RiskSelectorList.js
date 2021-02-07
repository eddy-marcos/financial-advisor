import React from 'react';
import { useSelector } from 'react-redux';
import RiskSelectorListItem from './RiskSelectorListItem';

const RiskSelectorList = () => {
  const riskLevels = useSelector(state => state.riskLevels.riskLevels);
  const activeRiskLevel = useSelector(state => state.riskLevels.activeRiskLevel);

  return (
    <ul className="risk-factor--list grid-x no-bullet align-middle">
      {
        riskLevels.map((level, index) => {
          return <RiskSelectorListItem 
                    riskLevel={index + 1} 
                    activeLevel={activeRiskLevel} 
                    key={index + 1} />
        })
      }
    </ul>
  );
}

export default RiskSelectorList;