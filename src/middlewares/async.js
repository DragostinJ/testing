export default ({ dispatch }) => next => action => {
  // chech to see if the action has a promise
  // on its 'payload' property
  // if it does, then wait for it to resolve
  // If it doesnt then send the action on the next middlware
  if (!action.payload || !action.payload.then) {
    return next(action);
  }
  // we want to wait for a promise to resolve
  //get its data and then create a new action
  //with that data and dispatch it
  action.payload.then(function(response) {
    const newAction = { ...action, payload: response };
    dispatch(newAction);
  });
};
