import React from 'react'
import {useNavigate} from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup';
import Alerta from './Alerta';
import Spinner from './Spinner';

const Formulario = ({ cliente, cargando }) => {
    const navigate = useNavigate();

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, "El nombre es mi corto")
            .max(20, "El nombre es muy largo")
            .required("El nombre del cliente es obligatorio"),
        empresa: Yup.string().required(
            "El Nombre de la empresa es obligatorio"
        ),
        email: Yup.string()
            .email("Email no valido")
            .required("El email es obligatorio"),
        telefono: Yup.number()
            .typeError("Telefono no valido")
            .integer("Numero no valido")
            .positive("Numero no valido"),
        notas: Yup.string(),
    });

    const initialValues = {
        nombre: cliente?.nombre ?? "",
        empresa: "",
        email: "",
        telefono: "",
        notas: "",
    };

    const handleSubmit = async (values) => {
        try {
            let res
            if (cliente.id) {
                // editar registro
                const url = `http://localhost:4000/clientes/${cliente.id}`;
                res = await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } else {
                //nuevo registro
                const url = "http://localhost:4000/clientes";
                res = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

            }
            await res.json()
            navigate("/clientes");
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    if (cargando) return <Spinner />
    
    return (
        <div className="px-5 py-10 mx-auto mt-10 bg-white rounded-md shadow md:w-3/4">
            <h1 className="text-xl font-bold text-center text-gray-600 uppercase">
                {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
            </h1>
            <Formik
                initialValues={cliente}
                enableReinitialize={true}
                onSubmit={(values, { resetForm }) => {
                    handleSubmit(values);
                    resetForm();
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({ errors, touched }) => {
                    //console.log(touched)
                    return (
                        <Form className="mt-10">
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="nombre"
                                >
                                    Nombre:
                                </label>
                                <Field
                                    id="nombre"
                                    type="text"
                                    className="block w-full p-3 mt-2 bg-gray-50"
                                    placeholder="Nombre del cliente"
                                    name="nombre"
                                />
                                {errors.nombre && touched.nombre ? (
                                    <Alerta>{errors.nombre}</Alerta>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="empresa"
                                >
                                    Empresa:
                                </label>
                                <Field
                                    id="empresa"
                                    type="text"
                                    className="block w-full p-3 mt-2 bg-gray-50"
                                    placeholder="Empresa del cliente"
                                    name="empresa"
                                />
                                {errors.empresa && touched.empresa ? (
                                    <Alerta>{errors.empresa}</Alerta>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="email"
                                >
                                    Email:
                                </label>
                                <Field
                                    id="email"
                                    type="email"
                                    className="block w-full p-3 mt-2 bg-gray-50"
                                    placeholder="Email del cliente"
                                    name="email"
                                />
                                {errors.email && touched.email ? (
                                    <Alerta>{errors.email}</Alerta>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="telefono"
                                >
                                    Telefono:
                                </label>
                                <Field
                                    id="telefono"
                                    type="tel"
                                    className="block w-full p-3 mt-2 bg-gray-50"
                                    placeholder="Telefono del cliente"
                                    name="telefono"
                                />
                                {errors.telefono && touched.telefono ? (
                                    <Alerta>{errors.telefono}</Alerta>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="notas"
                                >
                                    Notas:
                                </label>
                                <Field
                                    as="textarea"
                                    rows="4"
                                    id="notas"
                                    type="text"
                                    className="block w-full h-40 p-3 mt-2 bg-gray-50"
                                    placeholder="Notas del cliente"
                                    name="notas"
                                />
                                {errors.notas && touched.notas ? (
                                    <Alerta>{errors.notas}</Alerta>
                                ) : null}
                            </div>
                            <input
                                type="submit"
                                value={
                                    cliente?.nombre
                                        ? "Editar Cliente"
                                        : "Agregar Cliente"
                                }
                                className="w-full p-3 mt-5 text-lg font-bold text-white uppercase bg-blue-800"
                            />
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

Formulario.defaultProps = {
    cliente: {},
    cargando: false
};

export default Formulario