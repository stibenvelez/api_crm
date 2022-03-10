import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import IniciarSesion from './layout/iniciarSesion';
import Layout from './layout/Layout';
import EditarClientes from './pages/EditarClientes';
import Inicio from "./pages/Inicio";
import LoginForm from './pages/LoginForm';
import NuevoCliente from './pages/NuevoCliente';
import VerCliente from "./pages/VerCliente";



function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="App">
          <Router>
              <Routes>
                  <Route path="/" element={<IniciarSesion />}>
                      <Route index element={<LoginForm />} />
                  </Route>
                  <Route path="/clientes" element={<Layout />}>
                      <Route index element={<Inicio />} />
                      <Route path="nuevo" element={<NuevoCliente />} />
                      <Route path="editar/:id" element={<EditarClientes />} />
                      <Route path=":id" element={<VerCliente />} />
                  </Route>
              </Routes>
          </Router>
      </div>
  );
}

export default App
