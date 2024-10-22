import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import Formfield from "../components/Formfield";
import {
  handleFileChange,
  handleDeleteFile,
  createFilesHtml,
} from "../helpers/fileHelpers";
import axios from "axios";

const Sanciones = () => {
  const { auth } = useContext(AuthContext);
  const [sanciones, setSanciones] = useState([]);
  const [tipoSanciones, setTipoSanciones] = useState([]);
  const [locaciones, setLocaciones] = useState([]);
  const [error, setError] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [archivosEdit, setArchivosEdit] = useState([]);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    solicitante: auth.id,
    tipoSancion: "",
    diasSuspension: "",
    fechaOtorgado: new Date().toISOString().split("T")[0],
    ubicacion: "",
    observacion: "",
    usuario_id: id,
    archivos: [],
  });

  // const [formDataEdit, setFormDataEdit] = useState({
  //   id: "",
  //   solicitante_edit: "",
  //   tipoSancion_edit: "",
  //   diasSuspension_edit: "",
  //   fechaOtorgado_edit: "",
  //   ubicacion_edit: "",
  //   observacion_edit: "",
  //   usuario_id: id,
  //   archivos: [],
  // });

  /**
   * Carga los tipos de sanciones para mostrar en el formulario
   */
  const fetchTipoSanciones = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      const response = await axios.get(
        "http://localhost:8000/api/tipo_sanciones",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTipoSanciones(response.data);
    } catch (error) {
      console.log("Error al cargar los tipo de sanciones", error);
    }
  };

  /**
   * Carga las locaciones para mostrar en el formulario
   */
  const fetchLocaciones = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      const response = await axios.get("http://localhost:8000/api/locaciones", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLocaciones(response.data);
    } catch (error) {
      console.log("Error al cargar las locaciones", error);
    }
  };

  useEffect(() => {
    fetchTipoSanciones();
    fetchLocaciones();
    tableSanciones();
  }, []);

  /**
   * Muestra u oculta un modal
   * Crea el HTML de los archivos subidos cuando se visualiza el modal para poder descargarlos
   */
  const handleStateModal = (id, sancionId = null) => {
    event.preventDefault();
    const modal = document.getElementById(id);
    modal.classList.toggle("hidden");
    modal.classList.toggle("flex");

    if (id === "modal_view") {
      const sancion = sanciones.find((sancion) => sancion.id === sancionId);
      document.getElementById("solicitante").textContent = sancion.solicitante.nombre + " " + sancion.solicitante.apellido;
      document.getElementById("tipoSancion").textContent = sancion.tipo.nombre;
      document.getElementById("diasSuspension").textContent = sancion.diasSuspension;
      document.getElementById("fechaOtorgado").textContent = new Date(
        sancion.fechaOtorgado
      ).toLocaleDateString("es-ES");
      document.getElementById("locacion").textContent = sancion.locacion.nombre;
      document.getElementById("observacion").textContent = sancion.observacion;
      createFilesHtml(sancion.archivos, null, "archivosSancionesView", true, 'http://localhost:8000/api/sanciones/download/');
    }
  };

  // const handleEdicion = (sancionId) => {
  //   event.preventDefault();
  //   const sancion = sanciones.find((sancion) => sancion.id === sancionId);
  //   setFormDataEdit({
  //     ...formDataEdit,
  //     id: sancion.id,
  //     solicitante_edit: sancion.solicitante.nombre  + " " + sancion.solicitante.apellido,
  //     tipoSancion_edit: sancion.tipo.id,
  //     diasSuspension_edit: sancion.diasSuspension,
  //     fechaOtorgado_edit: sancion.fechaOtorgado,
  //     ubicacion_edit: sancion.locacion.id,
  //     observacion_edit: sancion.observacion,
  //     archivos: sancion.archivos,
  //   });
  //   const modal = document.getElementById('modal_edicion');
  //   modal.classList.toggle("hidden");
  //   modal.classList.toggle("flex");

  //   createFilesHtml(sancion.archivos, setArchivosEdit, "archivosSancionesEdicion", false);
  // }

  /**
   * Función para enviar el formulario de la sancion a la BD
   */
  const handleSubmitSancion = async (type = '') => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      let url = "http://localhost:8000/api/sanciones/add";

      formData.archivos = archivos;
      let response = await axios.post(url,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { mensaje, sanciones } = response.data;
      // Cerrar modal
      handleStateModal("modal_add");
      // Limpiar formulario
      setFormData({
        solicitante: "",
        tipoSancion: "",
        diasSuspension: "",
        fechaOtorgado: "",
        ubicacion: "",
        observacion: "",
        usuario_id: id,
      });
      // Actualizar la tabla de sanciones
      setSanciones(sanciones);

    } catch (error) {
      if (error.response.data.mensaje) {
        setError(error.response.data.mensaje);
        return;
      } else {
        setError(error.response.data.errors);
      }
      console.log("Error al cargar la sancion", error);
    }
  };

  /**
   * Cada vez que un campo del formulario cambia, actualiza el estado de formData
   */
  const handleFormChange = (e, type = 'add') => {
    // if (type === "edit") {
    //   setFormDataEdit({
    //     ...formDataEdit,
    //     [e.target.name]: e.target.value
    //   });
    // } else {
    // }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (id) => {
    event.preventDefault();
    document.getElementById(id).click();
  };

  /**
   * Carga las sanciones del usuario en la tabla
   */
  const tableSanciones = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      const response = await axios.get(
        `http://localhost:8000/api/sanciones/usuario/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSanciones(response.data.sanciones);
    } catch (error) {
      console.error("Error al obtener las sanciones", error);
    }
  };

  // Actualiza la vista de los archivos al cambiar el estado de archivos
  useEffect(() => {
    createFilesHtml(archivos, setArchivos, "archivosSanciones");
  }, [archivos]);

  // useEffect(() => {
  //   createFilesHtml(archivosEdit, setArchivosEdit, "archivosSancionesEdicion");
  // }, [archivosEdit]);

  return (
    <section>
      <h5 className="text-center text-2xl">Sanciones</h5>
      <div className="flex justify-end mb-2">
        <button
          onClick={() => handleStateModal("modal_add")}
          className="bg-blue-400 border border-sky-600 rounded-md font-bold p-1 text-white px-10 hover:bg-blue-500 transition-all duration-200"
        >
          Nueva Sanción
        </button>
      </div>

      <table className="w-full">
        <thead className="bg-sky-100">
          <tr>
            <th className="border border-sky-300">Solicitante</th>
            <th className="border border-sky-300">Tipo de Sanción</th>
            <th className="border border-sky-300">Días de Suspensión</th>
            <th className="border border-sky-300">Fecha Otorgado</th>
            <th className="border border-sky-300">Ubicación</th>
            <th className="border border-sky-300">Observación</th>
            <th className="border border-sky-300">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sanciones.map((sancion) => {
            const fechaOtorgado = new Date(sancion.fechaOtorgado);
            fechaOtorgado.setDate(fechaOtorgado.getDate() + 1);

            return (
              <tr key={sancion.id}>
                <td className="border p-1">
                  {sancion.solicitante.nombre +
                    " " +
                    sancion.solicitante.apellido}
                </td>
                <td className="border p-1">{sancion.tipo.nombre}</td>
                <td className="border p-1">{sancion.diasSuspension}</td>
                <td className="border p-1">
                  {fechaOtorgado.toLocaleDateString("es-ES")}
                </td>
                <td className="border p-1">{sancion.locacion.nombre}</td>
                <td className="border p-1">{sancion.observacion}</td>
                <td className="border p-1 flex gap-3 justify-center text-center">
                  <button
                    className="bg-sky-200 border border-sky-300 rounded-md text-gray-600 font-bold p-1 px-10 hover:bg-sky-300 transition-all duration-200"
                    onClick={() => handleStateModal("modal_view", sancion.id)}
                  >
                    Ver
                  </button>
                  {/* <button
                    className="bg-orange-200 border border-orange-300 rounded-md text-gray-600 font-bold p-1 px-10 hover:bg-orange-300 transition-all duration-200"
                    onClick={() => handleEdicion(sancion.id)}
                  >
                    Editar
                  </button> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal para cargar una nueva sanción */}
      <div
        id="modal_add"
        className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden items-center justify-center"
      >
        <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
          <h2 className="text-xl font-semibold mb-4">Nueva Sanción</h2>
          <form onSubmit={handleSubmitSancion}>
            <section className="grid grid-cols-2 gap-3">
              <Formfield
                label="Solicitante"
                labelClass="block text-gray-700 font-bold text-gray-700"
                type="text"
                name="solicitante"
                value={auth.nombre + " " + auth.apellido}
                onChange={() => {handleFormChange(event, 'add')} }
                classes="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                placeholder="Ingrese quién lo solicita"
                readonly={true}
                error={error?.solicitante}
              />

              <div>
                <label className="block font-bold text-gray-700">
                  Tipo de Sanción{" "}
                  <span className="text-red-600">
                    <small>*</small>
                  </span>
                </label>
                <select
                  name="tipoSancion"
                  value={formData.tipoSancion}
                  onChange={() => {handleFormChange(event, 'add')} }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Seleccione una opción</option>
                  {tipoSanciones?.map((tipoSancion) => (
                    <option key={tipoSancion.id} value={tipoSancion.id}>
                      {tipoSancion.nombre}
                    </option>
                  ))}
                </select>
                {error?.tipoSancion && (
                  <div className="invalid-feedback text-red-600 text-sm font-medium">
                    {error?.tipoSancion}
                  </div>
                )}
              </div>

              <Formfield
                label="Días de Suspensión"
                labelClass="block text-gray-700 font-bold text-gray-700"
                type="number"
                name="diasSuspension"
                value={formData.diasSuspension}
                onChange={() => {handleFormChange(event, 'add')} }
                classes="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ingrese la cantidad de dias"
                error={error?.diasSuspension}
                required={true}
              />

              <Formfield
                label="Fecha Otorgado"
                labelClass="block text-gray-700 font-bold text-gray-700"
                type="date"
                name="fechaOtorgado"
                id="fechaOtorgado"
                value={new Date().toISOString().split("T")[0]}
                onChange={(event) => {
                  handleFormChange(event, 'add');
                  handleDates(event);
                }}
                classes="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                error={error?.fechaOtorgado}
                readonly={true}
              />

              <div>
                <label className="block font-bold text-gray-700">
                  Ubicación{" "}
                  <span className="text-red-600">
                    <small>*</small>
                  </span>
                </label>
                <select
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={() => {handleFormChange(event, 'add')} }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Seleccione una opción</option>
                  {locaciones?.map((locacion) => (
                    <option key={locacion.id} value={locacion.id}>
                      {locacion.nombre}
                    </option>
                  ))}
                </select>
                {error?.ubicacion && (
                  <div className="invalid-feedback text-red-600 text-sm font-medium">
                    {error?.ubicacion}
                  </div>
                )}
              </div>

              <div className="col-span-2">
                <label className="block font-bold text-gray-700">
                  Observación <small>(Opcional)</small>
                </label>
                <textarea
                  name="observacion"
                  value={formData.observacion}
                  onChange={() => {handleFormChange(event, 'add')} }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Ingrese una breve observación"
                ></textarea>
              </div>

              <div className="col-span-2">
                <label className="block font-bold text-gray-700">
                  Archivos <small>(Opcional)</small>
                </label>
                <div className="mb-5">
                  <input
                    type="file"
                    id="fileSanciones"
                    hidden
                    multiple
                    onChange={(e) =>
                      handleFileChange(e, archivos, setArchivos, setError)
                    }
                  />
                  <button
                    className="bg-blue-400 border border-sky-600 rounded-md font-bold p-1 text-white px-10 hover:bg-blue-500 transition-all duration-200"
                    onClick={() => handleClick("fileSanciones")}
                  >
                    Subir archivos
                  </button>
                </div>
                <div id="archivosSanciones" className="space-y-4"></div>
                {error?.archivos && (
                  <div className="invalid-feedback text-red-600 text-sm font-medium">
                    {error?.archivos}
                  </div>
                )}
              </div>
            </section>
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-400 text-white px-4 py-2 text-sm font-bold tracking-wide rounded cursor-pointer hover:bg-gray-500 transition-all duration-200"
                onClick={() => handleStateModal("modal_add")}
              >
                Cerrar
              </button>
              <button
                onClick={() => handleSubmitSancion()}
                className="bg-green-400 border border-green-600 text-sm rounded-md font-bold p-1 text-white px-10 hover:bg-green-500 transition-all duration-200"
              >
                Agregar Examen
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal para visualizar la sanción */}
      <div
        id="modal_view"
        className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden items-center justify-center"
      >
        <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
          <h2 className="text-xl font-semibold mb-4">Sanción</h2>
          <section className="grid grid-cols-4 gap-3">
            <div className="col-span-2">
              <p className="font-semibold mr-2">Solicitante:</p>
              <p id="solicitante">Mirko Dinamarca</p>
            </div>
            <div className="col-span-2">
              <p className="font-semibold mr-2">Tipo de Sanción:</p>
              <p id="tipoSancion">Suspensión sin goce de haberes</p>
            </div>
            <div className="col-span-1">
              <p className="font-semibold mr-2">Días de Suspensión:</p>
              <p id="diasSuspension">12 días</p>
            </div>
            <div className="col-span-1">
              <p className="font-semibold mr-2 col-span-1">Fecha Otorgado:</p>
              <p id="fechaOtorgado">10/12/1999</p>
            </div>
            <div className="col-span-2">
              <p className="font-semibold mr-2 col-span-2">Ubicación:</p>
              <p id="locacion">Base 1</p>
            </div>
            <div className="col-span-4 mb-3">
              <p className="font-semibold mr-2 col-span-2">Observación:</p>
              <p id="observacion"></p>
            </div>

            <div className="col-span-2">
              <label className="block font-bold text-gray-700">Archivos</label>
              <div id="archivosSancionesView" className="space-y-4"></div>
            </div>
          </section>
          <div className="flex justify-end gap-3">
            <button
              className="bg-red-500 text-white px-4 py-2 text-sm font-bold tracking-wide rounded"
              onClick={() => handleStateModal("modal_view")}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>

      {/* Modal para editar una sanción */}
      {/* <div
        id="modal_edicion"
        className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden items-center justify-center"
      >
        <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
          <h2 className="text-xl font-semibold mb-4">Edición de Sanción</h2>
          <form onSubmit={handleSubmitSancion}>
            <section className="grid grid-cols-2 gap-3">
              <Formfield
                label="Solicitante"
                labelClass="block text-gray-700 font-bold text-gray-700"
                type="text"
                name="solicitante_edit"
                value={formDataEdit.solicitante_edit}
                onChange={() => {handleFormChange(event, 'edit')} }
                classes="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                placeholder="Ingrese quién lo solicita"
                readonly={true}
                error={error?.solicitante_edit}
              />

              <div>
                <label className="block font-bold text-gray-700">
                  Tipo de Sanción{" "}
                  <span className="text-red-600">
                    <small>*</small>
                  </span>
                </label>
                <select
                  name="tipoSancion_edit"
                  value={formDataEdit.tipoSancion_edit}
                  onChange={() => {handleFormChange(event, 'edit')} }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Seleccione una opción</option>
                  {tipoSanciones?.map((tipoSancion) => (
                    <option key={tipoSancion.id} value={tipoSancion.id}>
                      {tipoSancion.nombre}
                    </option>
                  ))}
                </select>
                {error?.tipoSancion_edit && (
                  <div className="invalid-feedback text-red-600 text-sm font-medium">
                    {error?.tipoSancion_edit}
                  </div>
                )}
              </div>

              <Formfield
                label="Días de Suspensión"
                labelClass="block text-gray-700 font-bold text-gray-700"
                type="number"
                name="diasSuspension_edit"
                value={formDataEdit.diasSuspension_edit}
                onChange={() => {handleFormChange(event, 'edit')} }
                classes="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ingrese la cantidad de dias"
                error={error?.diasSuspension_edit}
                required={true}
              />

              <Formfield
                label="Fecha Otorgado"
                labelClass="block text-gray-700 font-bold text-gray-700"
                type="date"
                name="fechaOtorgado_edit"
                id="fechaOtorgado"
                value={formDataEdit.fechaOtorgado_edit}
                onChange={(event) => {
                  handleFormChange(event, 'edit');
                  handleDates(event);
                }}
                classes="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                error={error?.fechaOtorgado_edit}
                readonly={true}
              />

              <div>
                <label className="block font-bold text-gray-700">
                  Ubicación{" "}
                  <span className="text-red-600">
                    <small>*</small>
                  </span>
                </label>
                <select
                  name="ubicacion_edit"
                  value={formDataEdit.ubicacion_edit}
                  onChange={() => {handleFormChange(event, 'edit')} }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Seleccione una opción</option>
                  {locaciones?.map((locacion) => (
                    <option key={locacion.id} value={locacion.id}>
                      {locacion.nombre}
                    </option>
                  ))}
                </select>
                {error?.ubicacion_edit && (
                  <div className="invalid-feedback text-red-600 text-sm font-medium">
                    {error?.ubicacion_edit}
                  </div>
                )}
              </div>

              <div className="col-span-2">
                <label className="block font-bold text-gray-700">
                  Observación <small>(Opcional)</small>
                </label>
                <textarea
                  name="observacion_edit"
                  value={formDataEdit.observacion_edit}
                  onChange={() => {handleFormChange(event, 'edit')} }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Ingrese una breve observación"
                ></textarea>
              </div>

              <div className="col-span-2">
                <label className="block font-bold text-gray-700">
                  Archivos <small>(Opcional)</small>
                </label>
                <div className="mb-5">
                  <input
                    type="file"
                    id="fileSancionesEdicion"
                    hidden
                    multiple
                    onChange={(e) =>
                      handleFileChange(e, archivosEdit, setArchivosEdit, setError)	
                    }
                  />
                  <button
                    className="bg-blue-400 border border-sky-600 rounded-md font-bold p-1 text-white px-10 hover:bg-blue-500 transition-all duration-200"
                    onClick={() => handleClick("fileSancionesEdicion")}
                  >
                    Subir archivos
                  </button>
                </div>
                <div id="archivosSancionesEdicion" className="space-y-4"></div>
                {error?.archivos_edit && (
                  <div className="invalid-feedback text-red-600 text-sm font-medium">
                    {error?.archivos_edit}
                  </div>
                )}
              </div>
            </section>
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-400 text-white px-4 py-2 text-sm font-bold tracking-wide rounded cursor-pointer hover:bg-gray-500 transition-all duration-200"
                onClick={() => handleEdicion()}
              >
                Cerrar
              </button>
              <button
                onClick={() => handleSubmitSancion('edit')}
                className="bg-green-400 border border-green-600 text-sm rounded-md font-bold p-1 text-white px-10 hover:bg-green-500 transition-all duration-200"
              >
                Editar Sanción
              </button>
            </div>
          </form>
        </div>
      </div> */}
    </section>
  );
};

export default Sanciones;
