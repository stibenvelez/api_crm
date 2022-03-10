import {useState, useEffect} from 'react'
import Cliente from '../components/Cliente';

const Inicio = () => {
    const [clientes, setClientes] = useState([])
    useEffect(() => {
        const obtenerClientesAPI = async () => {
            try {
                const url = "http://localhost:4000/clientes";
                const res = await fetch(url)
                const result = await res.json()
                setClientes(result);
            } catch (error) {
                
            }
        }
        obtenerClientesAPI()
    }, [])

    const handleEliminar = async id => {
        const confirmar = confirm('¿Deseas eliminar este cliente?');
        if (confirmar) {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                res = await fetch(url, {
                    method: "DELETE"
                });
                await res.json()
                const arrayCliente = clientes.filter(cliente => cliente.id !== id)
                console.log(arrayCliente);
                setClientes(arrayCliente);
            } catch (error) {
                
            }
            
        }

    }
    
    return (
        <>
            <h1 className="text-4xl font-black text-blue-900">Clientes</h1>
            <p className="mt-3">Administra tus clientes</p>

            <table className="w-full mt-5 bg-white shadow table-auto">
                <thead className="text-white bg-blue-800">
                    <tr>
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Contacto</th>
                        <th className="p-2">Empresa</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <Cliente
                            key={cliente.id}
                            cliente={cliente}
                            handleEliminar={handleEliminar}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Inicio;