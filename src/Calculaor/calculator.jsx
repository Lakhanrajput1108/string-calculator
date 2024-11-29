import React, { useState } from "react";

// Simple string calculator component
const StringCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const add = (numbers) => {
    if (numbers === "") return 0;

    if (numbers.startsWith("//")) {
      // added delimiter logic below 
      const delimiterLineEndIndex = numbers.indexOf("\n");
      const delimiter = numbers.slice(2, delimiterLineEndIndex);
      const numString = numbers.slice(delimiterLineEndIndex + 1);
      const numArray = numString.split(delimiter).map(Number);
      return numArray.reduce((acc, num) => acc + num, 0);
    }

  // below code for new line separation
    const numArray = numbers.split(/[\n,]/).map(Number);
    return numArray.reduce((acc, num) => acc + num, 0);
  };
  
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    try {
      const sum = add(input);
      setResult(sum);
      setError(null); // Clear error if no issue
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>String Calculator</h1>
      <textarea 
        value={input} 
        onChange={handleChange} 
        rows="4" 
        cols="50" 
        placeholder="Enter numbers separated by commas"
      />
      <br />
      <button onClick={handleSubmit}>Calculate</button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {result !== null && <h2>Result: {result}</h2>}
    </div>
  );
};

export default StringCalculator;
