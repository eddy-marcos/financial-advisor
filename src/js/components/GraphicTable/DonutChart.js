import React from 'react';
import { useSelector } from 'react-redux';
import PieGraph from './PieGraph';

function DonutChart() {
  const activeRiskLevel = useSelector(state => 
    state.riskLevels.riskLevels[ 
      state.riskLevels.activeRiskLevel - 1
    ]);

  const height = 500;
  const width = 500;
  const margin = 50;
  const innerRadius = 100;
  const outerRadius = (width / 2) - margin;
  
  const colors = [
    '#1f77b4',
    '#aec7e8',
    '#ff7f0e',
    '#ffbb78',
    '#2ca02c'
  ];
  const defaultValues = [20, 20, 20, 20, 20];
  const defaultText = "Select Level";

  return (
    <PieGraph
      data={!activeRiskLevel 
        ? defaultValues 
        : activeRiskLevel
      }
      width={width}
      height={height}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      colors={colors}
      shouldDisplayDefault={!activeRiskLevel}
      defaultText={defaultText}
    />
  )
}

export default DonutChart;