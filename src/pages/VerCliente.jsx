import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
useParams

const VerCliente = () => {
    const [cliente, setcliente] = useState({})
    const [cargando, setcargando] = useState(false)

    const params = useParams()

    useEffect(() => {   
        setcargando(!cargando)
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${params.id}`;
                const res = await fetch(url)
                const result = await res.json()
                setcliente(result);
            } catch (error) {
                console.log(error);
            }

            setcargando(false)
        }
        obtenerClienteAPI()
        
    }, [])

    const { nombre, empresa, email, telefono, notas, id } = cliente;
 
        if (cargando) {
            return<Spinner/>;
        }
    
    return (
        Object.keys(cliente).length === 0
            ? <p>No hay resultados</p>
            : (
        <div>
            <>
                    <h1 className="text-4xl font-black text-blue-900">
                        Ver cliente: {nombre}
                    </h1>
                    <p className="mb-3 ">Informacion del cliente</p>

                    {email && (
                        <p className="text-2xl text-gray-600">
                            <span className=" text-gray-800 uppercase font-bold">
                                Email:{" "}
                            </span>
                            {email}
                        </p>
                    )}
                    {telefono && (
                        <p className="text-2xl text-gray-600">
                            <span className=" text-gray-800 uppercase font-bold">
                                Tel:{" "}
                            </span>
                            {telefono}
                        </p>
                    )}

                    {empresa && (
                        <p className="text-2xl text-gray-600">
                            <span className=" text-gray-800 uppercase font-bold">
                                Empresa:{" "}
                            </span>
                            {empresa}
                        </p>
                    )}

                    {notas && (
                        <p className="text-2xl text-gray-600">
                            <span className=" text-gray-800 uppercase font-bold">
                                Notas:{" "}
                            </span>
                            {notas}
                        </p>
                    )}
            </>
        
        </div>
    ))
    
    
}

export default VerCliente