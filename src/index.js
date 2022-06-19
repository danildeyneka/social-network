import store from "./redux/store";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

    root.render(
        // <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}
                    // нужен для работы редакса и хуков
                >
                    <App
                        // dispatch={store.dispatch.bind(store)} // вместо  addPost={store.addPost.bind(store)}
                        // уже не нужен, тк стор был вынесен через общие пропсы, а потом через Provider
                    />
                </Provider>
            </BrowserRouter>
         // </React.StrictMode> // чтобы useState не вызывался 2 раза (проверка на его размонтированность)
    )