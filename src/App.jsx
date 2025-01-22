import { useReducer } from 'react'
import './App.css'
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';


export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  DELETE_DIGIT: 'delete-digit',
  CLEAR: 'claer',
  SET_OPERATION: 'set-operation',
  EQUALS: 'equals'
}

const reducer = (state, {type, payload}) => {
  switch (type) {
      case ACTIONS.ADD_DIGIT:

     if (state.overwrite == true) {
      return {
        ...state,
        currentOperand: payload.digit,
        overwrite: false
      }
     }

      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === '.' && state.currentOperand.includes(".")) return state;

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      }

      case ACTIONS.CLEAR: 
      return {}
      
      case ACTIONS.DELETE_DIGIT:
          if (state.overwrite) {
             return {
              ...state,
              overwrite: false,
              currentOperand: null
             }
          }
          if (state.currentOperand === null) return state;
          if (state.currentOperand.lenth === 1) {
            return {
              ...state,
              currentOperand: null
            }
          }
          return {
            ...state,
            currentOperand: state.currentOperand.slice(0, -1)
          }

      case ACTIONS.SET_OPERATION:
        if (state.currentOperand === null && state.previousOperand === null) {
          return state;
        }

        // Handle negative sign after operator
        if (payload.operation === '-' && state.currentOperand === null) {
          return {
            ...state,
            currentOperand: '-'
          }
        }

        // Replace previous operator if current is negative or null
        if (state.currentOperand === null || state.currentOperand === '-') {
          return {
            ...state,
            operation: payload.operation,
            currentOperand: null
          }
        }

        // First operation
        if (state.previousOperand == null) {
          return {
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null
          }
        }

        // Chain operations
        return {
          ...state,
          previousOperand: evaluate(state.currentOperand, state.previousOperand, state.operation),
          operation: payload.operation,
          currentOperand: null
        }

     case ACTIONS.EQUALS:
      if (state.currentOperand === null || state.previousOperand === null || state.operation === null) {
        return state;
      }
      return {
        ...state, 
        overwrite: true,
        currentOperand: evaluate(state.currentOperand, state.previousOperand, state.operation), 
        previousOperand: null,
        operation: null,
      }
  }  
}
 
const INTEGER_FORMATTER = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0
});

function formatCurrentOperand(operand) {
  if (operand == null || operand === '') return "0"
  
  const [integer, decimal] = operand.toString().split('.')
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function formatPreviousOperand(operand) {
  if (operand == null || operand === '') return ""
  
  const [integer, decimal] = operand.toString().split('.')
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

 

function evaluate(currentOperand, previousOperand, operation) {
   const prev = parseFloat(previousOperand);
   const current = parseFloat(currentOperand);

   if (isNaN(prev) || isNaN(current)) return;
   let computation = '';
   
   switch(operation) {
    case "+":
      computation = prev + current;
      break
      case '-':
      computation =  prev - current;
      break
      case "*":
      computation =  prev * current;
      break
      case '÷':
      computation = prev / current;
      
   }
   return computation.toString();
   
}


function App() {
  
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});

  return (
    <>
    <div className="calculator" id="calculator">
      <div className="display">
        <div className="previous-operand">{formatPreviousOperand(previousOperand)} {operation}</div>
        <div id="display" className="current-operand">{formatCurrentOperand(currentOperand)}</div>
      </div>
      <button id="clear" className="span-2" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton id="divide" operation='÷' dispatch={dispatch} />
      <DigitButton id="one" digit="1" dispatch={dispatch} />
      <DigitButton id="two" digit="2" dispatch={dispatch} />
      <DigitButton id="three" digit="3" dispatch={dispatch} />
      <OperationButton id="multiply" operation='*' dispatch={dispatch} />
      <DigitButton id="four" digit="4" dispatch={dispatch} />
      <DigitButton id="five" digit="5" dispatch={dispatch} />
      <DigitButton id="six" digit="6" dispatch={dispatch} />
      <OperationButton id="add" operation='+' dispatch={dispatch} />
      <DigitButton id="seven" digit="7" dispatch={dispatch} />
      <DigitButton id="eight" digit="8" dispatch={dispatch} />
      <DigitButton id="nine" digit="9" dispatch={dispatch} />
      <OperationButton id="subtract" operation='-' dispatch={dispatch} />
      <DigitButton id="zero" digit="0" dispatch={dispatch} />
      <DigitButton id="decimal" digit="." dispatch={dispatch} />

      <button className="span-2" id="equals" onClick={() => dispatch({type: ACTIONS.EQUALS})}>=</button>
    </div>
    </>
  )
}

export default App
