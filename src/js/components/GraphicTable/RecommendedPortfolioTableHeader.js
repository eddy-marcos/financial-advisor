import React from 'react';
import { categories } from '../../data';

const RecommendedPortfolioTableHeader = () => {
  
  const generateCategoryList = () => {
    return categories.map(category => {
      return <th key={category.key}>{category.label} %</th>;
    })
  }

  return (
    <thead>
      <tr>
        <th key="risk">Risk</th>
        {generateCategoryList()}
      </tr>
    </thead>
  );
}

export default RecommendedPortfolioTableHeader;