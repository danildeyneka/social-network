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
                    state={store.getState()}
                    addPost={store.addPost}
                    updateNewPost={store.updateNewPost}
                />
            </BrowserRouter>
        </React.StrictMode>
    );
}

rerenderDOM(store.getState()) // исходный рендер всего приложения

store.subscribe(rerenderDOM)