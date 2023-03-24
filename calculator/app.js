const input_element = document.querySelector(".input"); // gets the input element from the HTML using the querySelector() method
const output_operation_element = document.querySelector(".operation .value"); // gets the element with class "operation" and child element with class "value" from the HTML
const output_result_element = document.querySelector(".result .value"); // gets the element with class "result" and child element with class "value" from the HTML


const OPERATOR = ["+", "-", "*", "/"];
const POWER = "POWER(", 
      FACTORIAL = "FACTORIAL(";

let data = {
  operation: [], // store the user's inputs while they built the equation
  formula: [] // store the formula that will be evaluated
}

// array of objects that represents the calculator buttons
let calculator_buttons = [
  {
    name: "sin",
    symbol: "sin",
    formula: "sin", // formula to be executed when the button is pressed
    type: "trig_function"
  },
  {
    name: "open_parentheses",
    symbol: "(",
    formula: "(",
    type: "key"
  },
  {
    name: "close_parentheses",
    symbol: ")",
    formula: ")",
    type: "key"
  },
  {
    name: "clear",
    symbol: "C",
    formula: false,
    type: "key"
  },
  {
    name: "delete",
    symbol: "CE",
    formula: false,
    type: "key"
  },
  {
    name: "division",
    symbol: "÷",
    formula: "/",
    type: "operator"
  },
  {
    name: "cos",
    symbol: "cos",
    formula: "cos",
    type: "trig_function"
  },
  {
    name: "factorial",
    symbol: "x!",
    formula: "factorial(",
    type: "math_function"
  },
  {
    name: 1,
    symbol: 1, 
    formula: 1,
    type: "number"
  },
  {
    name: 2,
    symbol: 2,
    formula: 2,
    type: "number"
  },
  {
    name: 3,
    symbol: 3,
    formula: 3,
    type: "number"
  },
  {
    name: "multiplication",
    symbol: "x",
    formula: "*",
    type: "operator"
  },
  {
    name: "tan",
    symbol: "tan",
    formula: "tan",
    type: "trig_function"
  },
  {
    name: "power",
    symbol: "x<span>y</span>",
    formula: "**(",
    type: "math_function"
  },
  {
    name: 4,
    symbol: 4,
    formula: 4,
    type: "number"
  },
  {
    name: 5,
    symbol: 5,
    formula: 5,
    type: "number"
  },
  {
    name: 6,
    symbol: 6,
    formula: 6,
    type: "number"
  },
  {
    name: "subtraction",
    symbol: "-",
    formula: "-",
    type: "operator"
  },
  {
    name: "log",
    symbol: "log",
    formula: "log",
    type: "math_function"
  },
  {
    name: "ln",
    symbol: "ln",
    formula: "ln",
    type: "math_function"
  },
  {
    name: 7,
    symbol: 7,
    formula: 7,
    type: "number"
  },
  {
    name: 8,
    symbol: 8,
    formula: 8,
    type: "number"
  },
  {
    name: 9,
    symbol: 9,
    formula: 9,
    type: "number"
  },
  {
    name: "addition",
    symbol: "+",
    formula: "+",
    type: "operator"
  },
  {
    name: "square root",
    symbol: "√",
    formula: "Math.sqrt",
    type: "math_function"
  },
  {
    name: "pi",
    symbol: "π",
    formula: "Math.PI",
    type: "number"
  },
  {
    name: "e",
    symbol: "e",
    formula: "Math.E",
    type: "number"
  },
  {
    name: 0,
    symbol: 0,
    formula: 0,
    type: "number"
  },
  {
    name: "decimal",
    symbol: ".",
    formula: ".",
    type: "number"
  },
  {
    name: "calculate",
    symbol: "=",
    formula: "=",
    type: "calculate"
  }
];

// create calculator buttons
function createButtons() {
  const buttons_per_row = 6; // no of buttons per row
  let added_buttons = 0;

  calculator_buttons.forEach(button => {
    if (added_buttons % buttons_per_row == 0) {
        input_element.innerHTML += `<div class="row"></div>`; 
    }

    const row = document.querySelector(".row:last-child");
    row.innerHTML += `<button id="${button.name}"> 
                        ${button.symbol}
                      </button>`; //$ to call the variable
    added_buttons++;
}); 
}

createButtons();

// create click event listene r
input_element.addEventListener("click", event => {
  const target_btn = event.target; // identify the target button that was clicked
  calculator_buttons.forEach( button => { // loop through each button in the calculator buttons array
    if (button.name == target_btn.id) calculator(button);
  })
})

// calculator function
function calculator(button) {
  
  if (button.type == "operator") {
    data.operation.push(button.symbol); // add the operator symbol to the array
    data.formula.push(button.formula); // add the operator formula to the array

  } else if (button.type == "number") {

    
    data.operation.push(button.symbol);
    data.formula.push(button.formula);

  } else if (button.type == "key") {
    if (button.name == "clear") {
      data.operation = []; // reset the operation array
      data.formula = []; // reset the formula array
      updateOutputResult(0); // update the output to 0
    } else if (button.name == "delete") {
      data.operation.pop(); // remove the last element from operation array
      data.formula.pop(); // remove the last element from formula array
    } else if (button.name == "close_parentheses") {
      data.operation.push(button.symbol);
      data.formula.push(button.formula);
    } else if (button.name == "open_parentheses") {
      data.operation.push(button.symbol);
      data.formula.push(button.formula);
    }

  } else if (button.type == "calculate") {
    formula_str = data.formula.join('');

    console.log(data.operation);
    console.log(data.formula);

    // fix power and factorial base problems
    let POWER_SEARCH_RESULT = search(data.formula, power);
    let FACTORIAL_SEARCH_RESULT = search(data.formula, factorial);


    const BASES = powerBaseGetter(data.formula, POWER_SEARCH_RESULT)
    BASES.forEach(base => {
      let toReplace = base + "^";
      let replaceWith = "Math.pow(" + base + ",";

      formula_str = formula_str.replace(toReplace, replaceWith);
    });


    const NUMBERS = factorialNumberGetter(data.formula, FACTORIAL_SEARCH_RESULT);
    NUMBERS.forEach(factorial => {
      formula_str = formula_str.replace(factorial.toReplace, factorial.replaceWith);

    });

    console.log(formula_str);
    
    let result = eval(formula_str);
    /*try{
      result = eval(formula_str);
    } catch (error) {
      if (error instanceof SyntaxError) {
        result = "Syntax Error!";
        updateOutputResult(result);
        return;
      }
    }*/

    ans = result;
    console.log(result);
    data.operation = [ result ];
    data.formula = [ result ];

    updateOutputResult(result);

  } else if (button.type == "trig_function") {
    data.operation.push(button.symbol + "(");
    data.formula.push(button.formula + "(");

  } else if (button.type == "math_function") {
      let symbol, formula;

      if (button.name == "factorial") {
        symbol = "!";
        formula = button.formula;
        data.operation.push(symbol);
        data.formula.push(formula);
      } else if (button.name == "power") {
        symbol = "^(";
        formula = button.formula;

        data.operation.push(symbol);
        data.formula.push(formula);
      } else if (button.name == "square root") {
        symbol = "√(";
        formula = button.formula + "(";
        data.operation.push(symbol);
        data.formula.push(formula);
      } else {
        symbol = button.symbol + "(";
        formula = button.formula + "(";
        data.operation.push(symbol);
        data.formula.push(formula);
      }
  }
  updateOutputResult(data.operation.join(""));
}

// update output operation
function updateOutputOperation(operation) {
  output_operation_element.innerHTML = operation;
}

// update output result
function updateOutputResult(result) {
  output_result_element.innerHTML = result;
}


function factorial(n) {
  var result = 1;

  if (n === 0 || n === 1)
    return 1;

  for (var i = n; i >= 1; i--) {
    result = result * i;
  }

  return result;
}

function search(array, keyword) {
  let search_result = [];
  array.forEach((element, index) => {
    if (element == keyword) 
    {
      search_result.push(index); // add the index of the element to the array
    }
  })
  return search_result; // returns the indices of all elements that match the keyword
} 

function powerBaseGetter(formula, POWER_SEARCH_RESULT) {
  let power_bases = [];

  POWER_SEARCH_RESULT.forEach(power_index => {
  let bases = [];
  
  let parentheses_count = 0;
  let previous_index = power_index-1;

  while(previous_index >= 0) {
    if (formula[previous_index] == "(") {
      parentheses_count--;
    }
    if (formula[previous_index] == ")") {
      parentheses_count++;
    }

    let isOperator = false;
    OPERATORS.forEach(OPERATOR => {
      if (formula[previous_index] == OPERATOR) {
        isOperator = true;
      }
    })

    let is_power = formula[previous_index] == POWER;

    if (isOperator && parentheses_count == 0 || is_power) {
      break;
    }

    bases.unshift(formula[previous_index]);
    previous_index--;
  }
  power_bases.push(bases.join(''));
})
  return power_bases;
}

function factorialNumberGetter(formula, FACTORIAL_SEARCH_RESULT) {
  let numbers = [];
  FACTORIAL_SEARCH_RESULT.forEach(factorial_index => {
    let number = [];
    let factorial_sequence = 0;

    let next_index = factorial_index + 1;
    let next_input = formula[next_index];

    if (next_index == FACTORIAL) 
    {
      factorial_sequence++;
      return
    }

    let first_factorial_index = index - factorial_sequence;

    let previous_index = first_factorial_index - 1;
    let parentheses_count = 0;

    while(previous_index >= 0) {
      if (formula[previous_index] == "(") {
        parentheses_count--;
      }
      if (formula[previous_index] == ")") {
        parentheses_count++;
      }
  
      let isOperator = false;
      OPERATORS.forEach(OPERATOR => {
        if (formula[previous_index] == OPERATOR) {
          isOperator = true;
        }
      })
  
    
      if (isOperator && parentheses_count == 0) {
        break;
      }
  
      bases.unshift(formula[previous_index]);
      previous_index--;
    }
    let number_str = number.join('');
    const factorial = "factorial(", close_parentheses = ")";
    let times = factorial_sequence + 1;

    let toReplace = number_str + FACTORIAL.repeat(times);
    let replaceWith = factorial.repeat(times) + number_str + close_parentheses.repeat(times);

    numbers.push({
      toReplace: toReplace,
      replaceWith: replaceWith
    })

    console.log(numbers);
    factorial_sequence = 0; // reset factorial_sequence
  })

  return numbers;
}

function sin(angle) {
  return Math.sin(angle);
}

function cos(angle) {
  return Math.cos(angle);
}

function tan(angle) {
  return Math.tan(angle);
}

function log(number) {
  return Math.log10(number);
}

function ln(number) {
  return Math.log(number);
}