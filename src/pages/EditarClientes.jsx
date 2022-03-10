import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
useParams;
import Formulario from "../components/Formulario";

const EditarClientes = () => {

  const [cliente, setcliente] = useState({});
  const [cargando, setcargando] = useState(false);

  const params = useParams();

  useEffect(() => {
      setcargando(!cargando);
      const obtenerClienteAPI = async () => {
          try {
              const url = `http://localhost:4000/clientes/${params.id}`;
              const res = await fetch(url);
              const result = await res.json();
              setcliente(result);
          } catch (error) {
              console.log(error);
          }

          setcargando(false);
      };
      obtenerClienteAPI();
  }, []);

  const { nombre, empresa, email, telefono, notas, id } = cliente;
  
    return (
        <div>
            <h1 className="text-4xl font-black text-blue-900">
                Editar Cliente
            </h1>
            <p className="mt-3">
                Utiliza este formulario para editar datos de cliente
            </p>
            {cliente?.nombre ?
                (
                    <Formulario
                cliente={cliente}
                cargando={cargando} />
                )
                :
                (
                    <p className="p-1 bg-yellow-400 text-yellow-900 block text-center my-3 rounded-md shadow">Cliente id no valido</p>
                )
            }
            
        </div>
    );
};

export default EditarClientes;
