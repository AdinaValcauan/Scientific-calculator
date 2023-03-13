const input_element = document.querySelector(".input");
const output_operation_element = document.querySelector(".operation .value");
const output_result_element = document.querySelector(".result .value");

const operators = ["+", "-", "*", "/"];
const power = "POWER(", 
      factorialstr = "FACTORIAL(", 
      square_root = "SQRT(";


let data = {
  operation: [],
  formula: [],
}

// the calculator buttons
let calculator_buttons = [
  {
    name: "sin",
    symbol: "sin",
    formula: "Math.sin",
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
    symbol: "⌫",
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
    formula: "factorial",
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
    symbol: "×",
    formula: "*",
    type: "operator"
  },
  {
    name: "tan",
    symbol: "tan",
    formula: "Math.tan()",
    type: "trig_function"
  },
  {
    name: "power",
    symbol: "x^y",
    formula: "^",
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
    formula: "Math.log",
    type: "math_function"
  },
  {
    name: "ln",
    symbol: "ln",
    formula: "Math.log",
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
  const buttons_per_row = 6;
  let added_buttons = 0;

  calculator_buttons.forEach(button => {
    if (added_buttons % buttons_per_row == 0) {
        input_element.innerHTML += `<div class="row"></div>`; //$ to call
    }

    const row = document.querySelector(".row:last-child");
    row.innerHTML += `<button id="${button.name}">
                        ${button.symbol}
                      </button>`;
    added_buttons++;
}); 
}

createButtons();

// create click event listener
input_element.addEventListener("click", event => {
  const target_btn = event.target;
  calculator_buttons.forEach( button => {
    if (button.name == target_btn.id) calculator(button);
  })
})

// calculator function
function calculator(button) {
  
  if (button.type == "operator") {
    data.operation.push(button.symbol);
    data.formula.push(button.formula);

  } else if (button.type == "number") {
    data.operation.push(button.symbol);
    data.formula.push(button.formula);

  } else if (button.type == "key") {
    if (button.name == "clear") {
      data.operation = [];
      data.formula = [];
      updateOutputResult(0);
    } else if (button.name == "delete") {
      data.operation.pop();
      data.formula.pop();
    } else if (button.name == "close_parentheses") {
      data.operation.push(button.symbol);
      data.formula.push(button.formula);
    } else if (button.name == "open_parentheses") {
      data.operation.push(button.symbol);
      data.formula.push(button.formula);
    }

  } else if (button.type == "calculate") {
    formula_str = data.operation.join('');
    //let result = new Function('return ' + formula_str)();
    console.log(formula_str);
    let result = eval(formula_str);

    //let power_search_result = search(data.formula, power);
    //let factorial_search_result = search(data.formula, factorial);

    try{
      result = eval(formula_str);
    } catch (error) {
      if (error instanceof SyntaxError) {
        result = "Syntax Error!";
        updateOutputResult(result);
        return;
      }
    }
    ans = result;
    data.operation = [ result ];
    data.formula = [ result ];

    updateOutputResult(result);

  } else if (button.type == "trig_function") {
    data.operation.push(button.symbol + "(");
    data.formula.push(button.formula);

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

function search(arry, keyword){
  let search_result = [];

  Array.forEach((element, index) => {
    if (element == keyword) {
      search_result.push(index);
    }
  })

  return search_result;
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

