import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'
import InputEcho from '../Components/InputEcho'
import ItemComponent from "../Components/ItemComponent.jsx";

function obtenerDatos() {
    const d = [
        {id: 1, nombre: "Item1", descripcion: "Desc1"},
        {id: 2, nombre: "Item2", descripcion: "Desc2"},
        {id: 3, nombre: "Item3", descripcion: "Desc3"},
        {id: 4, nombre: "Item4", descripcion: "Desc4"},
        {id: 5, nombre: "Item5", descripcion: "Desc5"},
        {id: 6, nombre: "Item6", descripcion: "Desc6"},
    ];
    return new Promise((resolve) => {
        setTimeout(() => resolve(d), 2000);
    });
}

function Home() {
    const [count, setCount] = useState(0)
    const [textoInput, setTextoInput] = useState("");

    const [datos, setDatos] = useState([]);
    const [cargandoDatos, setCargandoDatos] = useState(false);

    const btnClick = async () => {
        setCargandoDatos(true);
        setDatos([]);
        const d = await obtenerDatos();
        setDatos(d);
        setCargandoDatos(false);
    };

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>

            <button onClick={() => btnClick()}>Cargar datos</button>
            <div>
                <strong>{cargandoDatos ? "Cargando datos..." : ""}</strong>
                {datos.map(i => <ItemComponent key={i.id} data={i}/>)}
            </div>
            <InputEcho titulo="Input de prueba" textoActualizado = {nuevoTexto => setTextoInput(nuevoTexto)}/>
            <p>Input Echo tiee el texto: <strong>{textoInput}</strong></p>

            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default Home;
