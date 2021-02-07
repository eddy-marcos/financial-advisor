import React, { useState } from 'react';
import RecommendedPortfolioTable from './RecommendedPortfolioTable';
import DonutChart from './DonutChart';
import ViewButton from './ViewButton';
import './graphic-table.scss';

const GraphicTableOverview = () => {

  const [displayAsGraph, setDisplayAsGraph] = useState(false);

  const handleTableModeChange = () => {
    setDisplayAsGraph(!displayAsGraph);
  }

  return (
    <div className="ideal-overview grid-x">
      <div className="cell small-12 medium-10 text-center">
        {displayAsGraph
          ? <DonutChart />
          : <RecommendedPortfolioTable />
        }
      </div>
      <div className="cell small-12 medium-2 text-center">
        <ViewButton 
          graphMode={displayAsGraph} 
          onClick={handleTableModeChange}/>
      </div>
    </div>
  );
}

export default GraphicTableOverview;