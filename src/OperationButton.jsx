import ACTIONS from './App.jsx';

export default function OperationButton({operation, dispatch}) {
  return <button onClick={() => dispatch({ type: ACTIONS.SET_OPERATION, payload: {operation} })} >{operation}</button>
}
