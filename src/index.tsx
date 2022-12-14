import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import reportWebVitals from './reportWebVitals';
import { store } from './app/store';

import App from './App';
import PokeCard from "./features/PokeCard/PokeCard";
import PokeList from "./features/PokeList/PokeList";

import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<Provider store={ store }>
		<BrowserRouter>
			<Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Navigate to="/pokelist/" replace={ true } />}/>
                    <Route path="/pokelist/" element={<PokeList/>} />
                    <Route path="/pokecard/:pokeId" element={<PokeCard/>} />
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: "1rem" }}>
                                <p>There's no pokemons here!</p>
                            </main>
                        }
                    />
                </Route>
			</Routes>
		</BrowserRouter>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
