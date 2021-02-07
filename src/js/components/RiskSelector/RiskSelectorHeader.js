import React from 'react';
import RiskSelectorBar from './RiskSelectorBar';
import ContinueButton from './ContinueButton';
import './risk-selector.scss';

const RiskSelectorHeader = () => {
    return (
      <section>
        <h2 className="text-center">Please Select A Risk Level For Your Investment Portfolio</h2>
        <div className="risk-factor-select grid-x">
          <RiskSelectorBar />
          <ContinueButton />
        </div>
      </section>
    );
}

export default RiskSelectorHeader;