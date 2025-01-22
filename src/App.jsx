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

        if (state.currentOperand === null) {
          return {
            ...state,
            operation: payload.operation
          }
        }

        if (state.previousOperand == null) {
          return {
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null
          }
        }

      return {
        ...state,
        previousOperand: evaluate(state.currentOperand, state.previousOperand, state.operation),
        currentOperand: null,
        operation: payload.operation
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
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-2" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation='÷' dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation='*' dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation='+' dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation='-' dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />

      <button className="span-2" onClick={() => dispatch({type: ACTIONS.EQUALS})}>=</button>
    </div>
    </>
  )
}

export default App
