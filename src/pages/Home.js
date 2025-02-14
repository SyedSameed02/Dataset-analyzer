import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';

function Home() {
  const [file, setFile] = useState(null);

  const handleFileUpload = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleAnalyze = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('File uploaded successfully:', data);

          // Redirect to PreprocessingPage with backend response data
          window.location.href = '/preprocessing';
        } else {
          alert('Failed to analyze the file. Please try again.');
        }
      } catch (error) {
        console.error('Error analyzing the file:', error);
        alert('An error occurred while analyzing the file.');
      }
    } else {
      alert('Please upload a CSV file.');
    }
  };

  return (
    <div>
      <h1>Dataset Analyzer</h1>
      <FileUploader onFileSelect={handleFileUpload} />
      <button onClick={handleAnalyze}>Analyze</button>
    </div>
  );
}

export default Home;
