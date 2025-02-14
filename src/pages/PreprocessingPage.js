import React, { useState } from 'react';
import Preprocessing from '../components/Preprocessing';

function PreprocessingPage() {
  const [selectedTechniques, setSelectedTechniques] = useState([]);

  const handlePreprocessing = () => {
    if (selectedTechniques.length) {
      console.log('Applying techniques...', selectedTechniques);
      window.location.href = '/results';
    } else {
      alert('Select at least one preprocessing technique.');
    }
  };

  return (
    <div>
      <h1>Preprocessing</h1>
      <Preprocessing
        techniques={selectedTechniques}
        setTechniques={setSelectedTechniques}
      />
      <button onClick={handlePreprocessing}>Apply Preprocessing</button>
    </div>
  );
}

export default PreprocessingPage;
