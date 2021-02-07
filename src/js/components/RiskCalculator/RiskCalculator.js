import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RiskCalculatorRow from './RiskCalculatorRow';
import RiskAdvise from './RiskAdvise';
import { toTwoDecimal } from '../utils.js';
import './risk-calculator.scss';

const RiskCalculator = () => {

  const riskLevel = useSelector( state => {
    return state.riskLevels.riskLevels[
      state.riskLevels.activeRiskLevel - 1
    ]
  });

  const [enableRebalance, setEnableRebalance] = useState(false); 
  const [incorrectAmountFormat, setIncorrectAmountFormat] = useState(false); 
  const [riskCalculator, setRiskCalculator] = useState({
    bonds: {
      amount: "",
      recommended: "",
      difference: ""
    },
    largeCap: {
      amount: "",
      recommended: "",
      difference: ""
    },
    midCap: {
      amount: "",
      recommended: "",
      difference: ""
    },
    foreign: {
      amount: "",
      recommended: "",
      difference: ""
    },
    smallCap: {
      amount: "",
      recommended: "",
      difference: ""
    }
  });
    
  function handleChange(category, value) {

    let currentPortfolioCopy = {...riskCalculator};
    currentPortfolioCopy[category].amount = isNaN(value) || value === ""  
      ? value 
      : parseInt(value);
    
    setRiskCalculator({ ...currentPortfolioCopy });

    checkStatusButton();
  }

  function checkStatusButton() {
    let enableRebalance = Object.values(riskCalculator).every((category) => {
      return category.amount !== "";
    });
    setEnableRebalance( enableRebalance );
  }

  function handleRebalance() {
    let currentPortfolioCopy = {...riskCalculator};
    if (!shouldRebalance(currentPortfolioCopy)) {
      resetCalculations();
      return;
    }
    const totalCurrentValues = calculateTotalCurrentValues();

    for (const [category, data] of Object.entries(currentPortfolioCopy)) {
      data.recommended = calculateNewAmount(category, totalCurrentValues);
      data.difference = calculateDifference(data.amount, data.recommended);
    }
    setIncorrectAmountFormat( false );
    setRiskCalculator({ ...currentPortfolioCopy });
  }

  function shouldRebalance(riskCalculator) {
    let arePositiveNumbers = Object.values(riskCalculator).every(category => {
      return !isNaN(category.amount) && Math.sign(category.amount) >= 0;
    })
    if (!arePositiveNumbers) {
      setIncorrectAmountFormat( true );
    }
    return arePositiveNumbers;
  }

  function resetCalculations() {
    let currentPortfolioCopy = {...riskCalculator};
    
    for (const [category, data] of Object.entries(currentPortfolioCopy)) {
      data.recommended = "";
      data.difference = "";
    }
    setRiskCalculator({ ...currentPortfolioCopy });
  }

  function calculateTotalCurrentValues() {
    let currentPortfolioCopy = Object.values(riskCalculator);
    return Object.keys(currentPortfolioCopy)
      .map((category) => {
        return currentPortfolioCopy[category].amount;
      })
      .reduce((sum, value) => {
        return sum + value;
      }, 0);
  }

  function calculateNewAmount(type, totalCurrentValues) {
    let idealPercentageValue = riskLevel[type];
    let newAmount = (idealPercentageValue * totalCurrentValues) / 100
    return Math.round( newAmount * 100) / 100;
  }

  function calculateDifference(amount, recommendedAmount) {
    return toTwoDecimal(recommendedAmount - amount);  
  }

  return (
    <div className="risk-calculator">
      <div className="risk-calculator--header grid-x">
        <h3 className="cell small-12 medium-10 text-center medium-text-left">
          Please Enter Your Current Portfolio
        </h3>
        <div className="cell small-12 medium-2 text-center medium-text-left"> 
          <button 
            className="risk-calculator--button button primary" 
            onClick={handleRebalance} 
            disabled={!enableRebalance}>
              Rebalance
          </button>
        </div>
      </div>
      <div className="grid-x">
        <table className="risk-calculator--table cell small-12 unstriped">
          <thead>
            <tr>
              <th className="text-center" colSpan="2" >Current Amount</th>
              <th className="text-center">Difference</th>
              <th className="text-center">New Amount</th>
              <th className="text-center">Recommended Transfers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <RiskCalculatorRow 
                onChange={handleChange} 
                category="bonds" 
                difference={riskCalculator.bonds.difference} 
                recommendedValue={riskCalculator.bonds.recommended} 
                currentValue={riskCalculator.bonds.amount}/>
              <RiskAdvise 
                incorrectAmountFormat={incorrectAmountFormat} 
                riskCalculator={riskCalculator}/>
            </tr>
            <tr>
              <RiskCalculatorRow 
                onChange={handleChange} 
                category="largeCap" 
                difference={riskCalculator.largeCap.difference} 
                recommendedValue={riskCalculator.largeCap.recommended} 
                currentValue={riskCalculator.largeCap.amount} />
            </tr>
            <tr>
              <RiskCalculatorRow 
                onChange={handleChange} 
                category="midCap" 
                difference={riskCalculator.midCap.difference} 
                recommendedValue={riskCalculator.midCap.recommended} 
                currentValue={riskCalculator.midCap.amount} />
            </tr>
            <tr>
              <RiskCalculatorRow 
                onChange={handleChange} 
                category="foreign" 
                difference={riskCalculator.foreign.difference} 
                recommendedValue={riskCalculator.foreign.recommended} 
                currentValue={riskCalculator.foreign.amount} />
            </tr>
            <tr>
              <RiskCalculatorRow 
                onChange={handleChange} 
                category="smallCap" 
                difference={riskCalculator.smallCap.difference} 
                recommendedValue={riskCalculator.smallCap.recommended} 
                currentValue={riskCalculator.smallCap.amount} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RiskCalculator;