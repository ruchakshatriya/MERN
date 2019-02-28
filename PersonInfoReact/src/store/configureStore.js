import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from '../reducers';

const  configureStore = (initialState) =>  {
    const middleware = applyMiddleware(thunk);

  // use this statement while release app
    //const middleware = applyMiddleware(thunk);

    const createStoreWithMiddleware = compose(
        middleware
    );
    const store = createStoreWithMiddleware(createStore)(rootReducer, initialState);

    return store;
};

export default configureStore;
