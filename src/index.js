import state, {subscribe} from "./redux/state";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {addPost, updateNewPost} from "./redux/state";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const rerenderDOM = (state) => {
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App
                    state={state}
                    addPost={addPost}
                    updateNewPost={updateNewPost}
                />
            </BrowserRouter>
        </React.StrictMode>
    );
}

rerenderDOM(state) // исходный рендер всего приложения

subscribe(rerenderDOM)