import React from 'react';
import RiskSelectorList from './RiskSelectorList';

const RiskSelectorBar = () => {
  return (
    <div className="cell small-12 medium-10">
      <div className="grid-x risk-factor--levels">
        <div className="text-left cell small-6">Low</div>
        <div className="text-right cell small-6">High</div>
      </div>
      <RiskSelectorList />
    </div>
  );
}

export default RiskSelectorBar;