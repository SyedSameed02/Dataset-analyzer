import React from 'react';

function Preprocessing({ techniques, setTechniques }) {
  const preprocessingOptions = ['Normalization', 'Standardization', 'Outlier Removal'];

  const handleCheckboxChange = (option) => {
    if (techniques.includes(option)) {
      setTechniques(techniques.filter((technique) => technique !== option));
    } else {
      setTechniques([...techniques, option]);
    }
  };

  return (
    <div>
      <h2>Select Preprocessing Techniques:</h2>
      {preprocessingOptions.map((option) => (
        <div key={option}>
          <input
            type="checkbox"
            id={option}
            checked={techniques.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
}

export default Preprocessing;
