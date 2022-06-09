import store from "./redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const rerenderDOM = (state) => { // или let ???
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App
                    state={state}
                    store={store}
                    dispatch={store.dispatch.bind(store)} // вместо  addPost={store.addPost.bind(store)}
                />
            </BrowserRouter>
        </React.StrictMode>
    );
}

rerenderDOM(store.getState()) // исходный рендер всего приложения. стейт вызывается геттером

store.subscribe(() => {
    let state = store.getState()
    rerenderDOM(state)
})