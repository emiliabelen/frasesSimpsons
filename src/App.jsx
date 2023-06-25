import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./assets/logosimpson.png";
import { Button, Container, Spinner } from "react-bootstrap";
import Frase from "./components/Frase";
import { useEffect, useState } from "react";

function App() {
  const [personaje, setPersonaje] = useState({});
  const [mostrarSpinner, setMostrarSpinner] = useState(false);

  useEffect(() => {
    consultarAPI();
  }, []);

  const consultarAPI = async () => {
    try {
      //se pone el valor true para mostrar el spinner en la pantalla
      setMostrarSpinner(true);

      //hacemos un llamado a la API
      //vamos hacer una peticion GET
      const respuesta = await fetch(
        "https://thesimpsonsquoteapi.glitch.me/quotes"
      );
      const datos = await respuesta.json();
      //se lo oculta al spinner de la pantalla con el valor false
      setMostrarSpinner(false);
      console.log(respuesta);
      console.log(datos[0]);
      setPersonaje(datos[0]);
    } catch (errores) {
      console.log(errores);
    }
  };

  //esta funcion permite mostrar el spinner si el valor de mostrarSpinner es true y ocultarlo si es false
  const mostrarComponente = mostrarSpinner ? (
    <>
      <br />

      <Spinner animation="border" />
      <br />
    </>
  ) : (
    <Frase personaje={personaje} />
  );

  return (
    <>
      <Container className="text-center my-5">
        <img src={logo} alt="Logo de los simpson" className="w-50" />
        {mostrarComponente}

        <Button variant="warning" onClick={consultarAPI}>
          Obtener frase
        </Button>
      </Container>
    </>
  );
}

export default App;
