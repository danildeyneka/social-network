import store from "./redux/store";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // <React.StrictMode>
    <HashRouter>
        {/*basename делает роутинг относительно домена*/}
        <Provider store={store}>
            {/*нужен для работы редакса и хуков*/}
            <App/>
        </Provider>
    </HashRouter>
    // </React.StrictMode> // коммент чтобы useState не вызывался 2 раза (проверка на его размонтированность)
)