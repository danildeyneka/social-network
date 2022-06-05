import store from "./redux/state";
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
                    dispatch={store.dispatch.bind(store)} // вместо  addPost={store.addPost.bind(store)}
                />
            </BrowserRouter>
        </React.StrictMode>
    );
}

rerenderDOM(store.getState()) // исходный рендер всего приложения

store.subscribe(rerenderDOM)