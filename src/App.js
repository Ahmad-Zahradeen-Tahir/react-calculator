import { useState } from "react";
import React from "react";

const App = () => {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
	const [allowance, setAllowance] = useState('');

  const ops = ["/", "*", "+", "-", "."];

  const updatedCalc = (value) => {
		setAllowance('disallow');
		if (
			ops.includes(value) && calc === '' || ops.includes(value) && ops.includes(calc.slice(-1))
		) {
			return;
		}
    setCalc(calc + value);

		if (!ops.includes(value)) {
			setAllowance('');
			setResult(eval(calc + value).toString())
		}
  };

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => updatedCalc(i.toString())}>
          {i}
        </button>
      );
    }
    return digits;
  };

	const calculate = () => {
		setCalc(eval(calc).toString());
	}
	
	const del = () => {
		setAllowance('');
		if (calc == '') {
			return;
		}

		const value = calc.slice(0, -1);

		setCalc(value);

	}
	

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span>{result}</span> : ""} {calc || "0"}
        </div>

        <div className="operators">
          <button className={allowance} onClick={() => updatedCalc("/")}>/</button>
          <button className={allowance} onClick={() => updatedCalc("*")}>*</button>
          <button className={allowance} onClick={() => updatedCalc("+")}>+</button>
          <button className={allowance} onClick={() => updatedCalc("-")}>-</button>

          <button id="del" onClick={del} >Del</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => updatedCalc("0")}>0</button>
          <button onClick={() => updatedCalc(".")}>.</button>

          <button id="equal" onClick={calculate} >=</button>
        </div>
      </div>
    </div>
  );
};

export default App;
