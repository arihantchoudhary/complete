import React from 'react';

const ModelSelector = ({ selectedModel, onModelChange }) => {
  return (
    <div className="model-selector">
      <select 
        value={selectedModel} 
        onChange={(e) => onModelChange(e.target.value)}
        className="model-select"
      >
        <option value="gpt-4.1">GPT-4.1</option>
        <option value="gpt-4.1-mini">GPT-4.1 Mini</option>
        <option value="gpt-4.1-nano">GPT-4.1 Nano</option>
        <option value="gpt-4o">GPT-4o</option>
        <option value="gpt-4o-mini">GPT-4o Mini</option>
        <option value="gpt-3.5">GPT-3.5</option>
        <option value="gpt-3.5-mini">GPT-3.5 Mini</option>
      </select>
    </div>
  );
};

export default ModelSelector; 