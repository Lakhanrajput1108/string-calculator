import React, { useState } from "react";

const StringCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const add = (numbers) => {
    if (numbers === "") return 0;

    // added delimiter logic below
    let numArray;
    if (numbers.startsWith("//")) {
      const delimiterLineEndIndex = numbers.indexOf("\n");
      const delimiter = numbers.slice(2, delimiterLineEndIndex);
      const numString = numbers.slice(delimiterLineEndIndex + 1);
      numArray = numString.split(delimiter).map(Number);
    } else {
      // below code for new line separation 
      numArray = numbers.split(/[\n,]/).map(Number);
    }

    // Check for negative numbers
    const negativeNumbers = numArray.filter(num => num < 0);
    if (negativeNumbers.length > 0) {
      throw new Error("Negative numbers not allowed: " + negativeNumbers.join(", "));
    }

    return numArray.reduce((acc, num) => acc + num, 0);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setInput(value);

    // check to accept only numeric values
    const invalidCharRegex = /[^0-9,\n]/;

    if (invalidCharRegex.test(value)) {
      setShowAlert(true);
      // Automatically hide the alert after 5 seconds
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  const handleSubmit = () => {
    try {
      const sum = add(input);
      setResult(sum);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>String Calculator </h1>
      < textarea
        value={input}
        onChange={handleChange}
        rows="10"
        cols="50"
        placeholder="Enter numbers separated by commas or newlines"
      />
      <br />
      < button onClick={handleSubmit} style={{ backgroundColor: '#04AA6D' }}> Calculate </button>

      {error && <p style={{ color: 'red' }}> Error: {error} </p>}

      {result !== null && <h2>Result: {result} </h2>}

      {
        showAlert && (
          <div style={
            {
              color: 'white',
              backgroundColor: 'red',
              padding: '10px',
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              borderRadius: '5px',
            }
          }>
            Invalid input! Only numbers, commas, and newlines are allowed.
          </div>
        )}
    </div>
  );
};

export default StringCalculator;
