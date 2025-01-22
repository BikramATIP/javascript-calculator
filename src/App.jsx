import { useReducer } from 'react'
import './App.css'
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';


export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  DELETE_DIGIT: 'delete-digit',
  CLEAR: 'cleer',
  SET_OPERATION: 'set-operation'
}

const reducer = (state, {type, payload}) => {
  if (type === ACTIONS.ADD_DIGIT) {
    return {
      ...state,
      currentOperand: state.currentOperand + payload.digit,
    }
  }
}

function App() {
  
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});

  return (
    <>
    <div className="calculator" id="calculator">
      <div className="display">
        <div className="previous-operand"></div>
        <div className="current-operand"></div>
      </div>
      <button className="span-2">AC</button>
      <button>DEL</button>
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

      <button className="span-2">=</button>
    </div>
    </>
  )
}

export default App
