const inputElement = document.querySelector(".input"); // gets the input element from the HTML using the querySelector() method
const outputOperationValue = document.querySelector(".operation .value"); // gets the element with class "operation" and child element with class "value" from the HTML
const outputResultValue = document.querySelector(".result .value"); // gets the element with class "result" and child element with class "value" from the HTML


const OPERATORS = ["+", "-", "*", "/"];
const FACTORIAL = "factorial(";

// define data objects
let data = {
  operation: [], // store the user's inputs while they built the equation
  expression: [] // store the expression that will be evaluated
}

// array of objects that represents the calculator buttons
let calculatorButtons = [
  {
    name: "sin",
    symbol: "sin", // symbol that will be displayed on the button
    formula: "Math.sin", // formula to be executed when the button is pressed
    type: "trig_function"
  },
  {
    name: "open_parenthesis",
    symbol: "(",
    formula: "(",
    type: "key"
  },
  {
    name: "close_parenthesis",
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
    formula: "Math.cos",
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
    formula: "Math.tan",
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
  const buttonsPerRow = 6; // no of buttons per row
  let addedButtons = 0;

  calculatorButtons.forEach(button => {
    if (addedButtons % buttonsPerRow == 0) { 
        inputElement.innerHTML += `<div class="row"></div>`; // create a new row
    }

    const row = document.querySelector(".row:last-child");
    row.innerHTML += `<button id="${button.name}"> 
                        ${button.symbol}
                      </button>`; //$ to call the variable
    addedButtons++;
}); 
}

createButtons();

// create click event listener
inputElement.addEventListener("click", event => {
  const targetButton = event.target; // identify the target button that was clicked

  calculatorButtons.forEach( button => { // loop through each button in the calculator buttons array
    if (button.name == targetButton.id) {
      calculator(button);
    }
  })
})

// calculator function
function calculator(button) {
  
  if (button.type == "operator") {
    data.operation.push(button.symbol); // add the operator symbol to the array
    data.expression.push(button.formula); // add the operator formula to the array

  } else if (button.type == "number") {
    data.operation.push(button.symbol);
    data.expression.push(button.formula);

  } else if (button.type == "key") {
    if (button.name == "clear") {
      data.operation = []; // reset the operation array
      data.expression = []; // reset the formula array
      updateOutputResult(0); // update the output to 0
    } else if (button.name == "delete") {
      data.operation.pop(); // remove the last element from operation array
      data.expression.pop(); // remove the last element from formula array
    } else if (button.name == "close_parenthesis") {
      data.operation.push(button.symbol);
      data.expression.push(button.formula);
    } else if (button.name == "open_parenthesis") {
      data.operation.push(button.symbol);
      data.expression.push(button.formula);
    }

  } else if (button.type == "trig_function") {
    data.operation.push(button.symbol + "(");
    data.expression.push(button.formula + "(");

  } else if (button.type == "math_function") {
      let symbol, formula;

      if (button.name == "factorial") {
        symbol = "!";
        formula = button.formula;
        data.operation.push(symbol);
        data.expression.push(formula);
      } else if (button.name == "power") {
        symbol = "^(";
        formula = button.formula;

        data.operation.push(symbol);
        data.expression.push(formula);
      } else if (button.name == "square root") {
        symbol = "√(";
        formula = button.formula + "(";
        data.operation.push(symbol);
        data.expression.push(formula);
      } else {
        symbol = button.symbol + "(";
        formula = button.formula + "(";
        data.operation.push(symbol);
        data.expression.push(formula);
      }

  } else if (button.type == "calculate") {
    formulaString = data.expression.join(''); // concatenate all the elements in the data.formula array into a string

    console.log(data.operation);
    console.log(data.expression);

    // fix factorial problems
    let factorialSearch = search(data.expression, FACTORIAL);
    //console.log(data.formula, FACTORIAL_SEARCH_RESULT)

    
    const NUMBERS = factorialNumberGetter(data.expression, factorialSearch);
    NUMBERS.forEach(factorial => {
      formulaString = formulaString.replace(factorial.toReplace, factorial.replaceWith);
    });
    
    console.log(formulaString);

    try{
      result = eval(formulaString);
    } catch (error) {
      if (error instanceof SyntaxError) {
        result = "Syntax Error!";
        updateOutputResult(result);
        return;
      }
    }

    console.log(result);
    data.operation = [ result ];
    data.expression = [ result ];

    updateOutputResult(result);

  }
  
  updateOutputResult(data.operation.join(""));
}

// update output operation
function updateOutputOperation(operation) {
  outputOperationValue.innerHTML = operation;
}

// update output result
function updateOutputResult(result) {
  outputResultValue.innerHTML = result;
}


function factorial(n) {
  var result = 1;

  if (n === 0 || n === 1) {
    return 1;
  }

  for (var i = n; i >= 1; i--) {
    result = result * i;
  }

  return result;
}

function search(array, keyword) {
  let searchResult = [];

  array.forEach((element, index) => {
    if (element == keyword) {
      searchResult.push(index); // add the index of the element to the array
    }
  })

  return searchResult; // returns the indices of all elements that match the keyword
} 

function factorialNumberGetter(expression, factorialSearch) {
  let numbers = []; // save all the numbers 

  factorialSearch.forEach(factIndex => {
    let number = []; // current factorial number
    let sequence = 0;

    let nextIndex = factIndex + 1; // index of the element that is next to the current factorial symbol
    let nextInput = expression[nextIndex]; // the element that is next to the current factorial symbol

    if (nextInput == FACTORIAL) { // check If the next element after the factorial symbol is another factorial symbol,
      sequence++; // increment the sequence counter 
      return // return to the beginning of the loop
    }

    let firstFactorialIndex = factIndex - sequence; // index of the first factorial symbol

    let previousIndex = firstFactorialIndex - 1; // index of the previous number
    let parenthesisCount = 0;

    while(previousIndex >= 0) {
      if (expression[previousIndex] == "(") {
        parenthesisCount--;
      }
      if (expression[previousIndex] == ")") {
        parenthesisCount++;
      }
  
      let isOperator = false;
      // checks if the current element is an operator
      OPERATORS.forEach(OPERATOR => {
        if (expression[previousIndex] == OPERATOR) {
          isOperator = true;
        }
      })
  
    
      if (isOperator && parenthesisCount == 0) {
        break;
      }
  
      number.unshift(expression[previousIndex]); 
      // unshift() -> modifies the array by adding the elements passed as parameters to the beginning of the array
      previousIndex--;
    }

    let numberString = number.join('');
    const factorial = "factorial(", closeParenthesis = ")";
    let times = sequence + 1;

    let toReplace = numberString + factorial.repeat(times);
    let replaceWith = factorial.repeat(times) + numberString + closeParenthesis.repeat(times);
    
    numbers.push({
      toReplace: toReplace,
      replaceWith: replaceWith
    })

    sequence = 0; // reset factorial_sequence
  })

  return numbers;
}

function log(number) {
  return Math.log10(number);
}

function ln(number) {
  return Math.log(number);
}

