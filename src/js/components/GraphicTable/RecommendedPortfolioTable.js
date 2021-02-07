import React from 'react';
import { useSelector } from 'react-redux';
import RecommendedPortfolioTableHeader from './RecommendedPortfolioTableHeader';
import RecommendedPortfolioTableBody from './RecommendedPortfolioTableBody';

const RecommendedPortfolioTable = () => {
  const riskLevelsData = useSelector(state => state.riskLevels.riskLevels);
  const activeRiskLevel = useSelector(state => state.riskLevels.activeRiskLevel); 

  return (
    <table className="recommended-portfolio-table">
      <RecommendedPortfolioTableHeader />
      <RecommendedPortfolioTableBody 
        activeLevel={activeRiskLevel} 
        riskLevels={riskLevelsData} />
    </table>
  );
}

export default RecommendedPortfolioTable;