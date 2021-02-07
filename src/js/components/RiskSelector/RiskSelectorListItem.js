import React from 'react';
import { useDispatch } from "react-redux";
import { setActiveRiskLevel } from '../../redux/actions/riskLevel.actions';

const RiskSelectorListItem = (props) => {

  const activeLevel = props.activeLevel;
  const riskLevel = props.riskLevel;
  const dispatch = useDispatch();

  function updateActiveLevel(riskLevel) {
    dispatch(setActiveRiskLevel(riskLevel));
  }

  return (
    <li className={`cell auto button secondary text-center ${ activeLevel === riskLevel ? "active" : ""}`}
      onClick={() => updateActiveLevel(riskLevel)}>
      { riskLevel}
    </li>
  );
}

export default RiskSelectorListItem;

