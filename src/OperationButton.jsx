import { ACTIONS } from './App.jsx';

export default function OperationButton({operation, dispatch, id}) {
  return (
  <button id={id}
   onClick={() => dispatch({ type: ACTIONS.SET_OPERATION, payload: {operation} })} >{operation}
   </button>)
}
