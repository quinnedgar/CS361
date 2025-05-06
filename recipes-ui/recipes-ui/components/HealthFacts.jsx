import React from 'react';

const HealthFact = ({ fact }) => {
  return (
    <div className="health-fact">
      <h4>Health Fact</h4>
      <p>{fact}</p>
    </div>
  );
};

export default HealthFact;
