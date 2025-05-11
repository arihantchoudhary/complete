import React from 'react';

const ModelSelector = ({ selectedModel, onModelChange }) => {
  return (
    <div className="model-selector">
      <select 
        value={selectedModel} 
        onChange={(e) => onModelChange(e.target.value)}
        className="model-select"
      >
        <option value="gpt-4">GPT-4</option>
        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
      </select>
    </div>
  );
};

export default ModelSelector; 