import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Formfield from "../components/Formfield";
import axios from "axios";

const ExamenesMedicos = () => {
  const [examenes, setExamenes] = useState([]);
  const [error, setError] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const { id } = useParams();

  /**
   * Muestra u oculta un modal
   * Crea el HTML de los archivos subidos cuando se visualiza el modal para poder descargarlos
   */
  const handleStateModal = (id, examenId = null) => {
    event.preventDefault();
    const modal = document.getElementById(id);
    modal.classList.toggle("hidden");
    modal.classList.toggle("flex");

    if (id === "modal_view") {
      const examen = examenes.find((examen) => examen.id === examenId);
      document.getElementById("examenTitulo").textContent = examen.examenTitulo;
      document.getElementById("diasReposo").textContent = examen.diasReposo;
      let fechaRealizado = new Date(examen.fechaRealizado);
      fechaRealizado.setDate(fechaRealizado.getDate() + 1);
      document.getElementById("fechaRealizado").textContent =
        fechaRealizado.toLocaleDateString("es-ES");
      let fechaVencimiento = new Date(examen.fechaVencimiento);
      fechaVencimiento.setDate(fechaVencimiento.getDate() + 1);
      document.getElementById("fechaVencimiento").textContent =
        fechaVencimiento.toLocaleDateString("es-ES");

      // Archivos
      const archivosContainer = document.getElementById(
        "archivosExamenesMedicosView"
      );
      archivosContainer.innerHTML = "";
      for (let i = 0; i < examen.archivos.length; i++) {
        const archivo = examen.archivos[i];
        console.log("Archivo => ", archivo);
        const article = document.createElement("article");
        const spanName = document.createElement("span");
        const spanDownload = document.createElement("span");
        spanName.className =
          "bg-gray-100 p-1 border border-blue-200 border-r-0 rounded-md rounded-tr-none rounded-br-none";
        spanName.textContent = archivo.archivo;
        spanDownload.className =
          "p-1 bg-blue-100 border border-blue-200 border-l-0 rounded-md rounded-tl-none rounded-bl-none text-blue-500 hover:bg-blue-200 transition-all duration-150 cursor-pointer";
        spanDownload.textContent = "Descargar";
        spanDownload.addEventListener("click", () =>
          window.open(
            `http://localhost:8000/api/examenes/download/${archivo.archivo}`
          )
        );
        article.className = "flex";
        article.appendChild(spanName);
        article.appendChild(spanDownload);
        archivosContainer.appendChild(article);
      }
    }
  };

  const [formData, setFormData] = useState({
    examenTitulo: "",
    diasReposo: "",
    fechaRealizado: "",
    fechaVencimiento: "",
    observacion: "",
    usuario_id: id,
    archivos: [],
  });

  /**
   * Cada vez que un campo del formulario cambia, actualiza el estado de formData
   */
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Función para enviar el formulario de examen médico a la BD
   */
  const handleSubmitExamen = async () => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      formData.archivos = archivos;
      const response = await axios.post(
        "http://localhost:8000/api/examenes/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { mensaje, examenes } = response.data;
      // Cerrar modal
      handleStateModal("modal_add");
      // Limpiar formulario
      setFormData({
        examenTitulo: "",
        diasReposo: "",
        fechaRealizado: "",
        fechaVencimiento: "",
        observacion: "",
        usuario_id: id,
      });
      // Actualizar la tabla de examenes
      setExamenes(examenes);

      console.log("Examen médico agregado", response.data);
    } catch (error) {
      if (error.response.data.mensaje) {
        setError(error.response.data.mensaje);
        return;
      } else {
        setError(error.response.data.errors);
      }
      console.log("Error al cargar el examen", error);
    }
  };

  /**
   * Carga los examenes médicos del usuario en la tabla
   */
  const tableExamenes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      const response = await axios.get(
        `http://localhost:8000/api/examenes/usuario/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setExamenes(response.data.examenes);
      console.log("Examenes médicos", response.data.examenes);
    } catch (error) {
      console.error("Error al obtener los examenes", error);
    }
  };

  /**
   * Maneja la carga de los archivos de los examenes médicos
   */
  const handleFileChange = (e) => {
    e.preventDefault();
    console.log('Entra aca si en el handleFileChange');
    let nuevosArchivos = Array.from(e.target.files);

    // Verificar que los archivos sean png, jpg o pdf y mostrar un error si no lo son
    const tiposPermitidos = ["image/png", "image/jpg", "image/jpeg", "application/pdf"];
    let archivosInvalidos = nuevosArchivos.filter(
      (archivo) => !tiposPermitidos.includes(archivo.type)
    );
    if (archivosInvalidos.length > 0) {
      console.log('Entro al if de archivos invalidos');
      let errorArchivo = {
        archivos: "Solo se permiten archivos png, jpg, jpeg o pdf",
      }
      console.log("Error => ", error);	
      setError(errorArchivo);
      return;
    } else {
      setError([]);
    }


    setArchivos([...archivos, ...nuevosArchivos]);
  };

  const handleClick = (id) => {
    event.preventDefault();
    document.getElementById(id).click();
  };

  /**
   * Elimina un archivo de la lista de archivos 
   */
  const handleDeleteFile = (name) => {
    const archivosContainer = document.getElementById(
      "archivosExamenesMedicos"
    );
    const files = archivos.filter((archivo) => archivo.name !== name);
    archivosContainer.innerHTML = "";
    setArchivos(files);
  };

  /**
   * Genera el HTML de los archivos subidos 
   */
  const createFilesHtml = (files) => {
    const archivosContainer = document.getElementById(
      "archivosExamenesMedicos"
    );
    archivosContainer.innerHTML = "";
    for (let i = 0; i < files.length; i++) {
      const archivo = files[i];
      const article = document.createElement("article");
      const spanName = document.createElement("span");
      const spanDelete = document.createElement("span");
      spanName.className =
        "bg-gray-100 p-1 border border-blue-200 border-r-0 rounded-md rounded-tr-none rounded-br-none";
      spanName.textContent = archivo.name;
      spanDelete.className =
        "p-1 bg-red-100 border border-red-200 border-l-0 rounded-md rounded-tl-none rounded-bl-none text-red-500 hover:bg-red-200 transition-all duration-150 cursor-pointer";
      spanDelete.textContent = "Eliminar";
      spanDelete.addEventListener("click", () =>
        handleDeleteFile(archivo.name)
      );
      article.className = "flex";
      article.appendChild(spanName);
      article.appendChild(spanDelete);
      archivosContainer.appendChild(article);
    }
  };

  /**
   * Cuando escucha un cambio en las fechas, si es la 'Fecha Realizado', coloca un atributo mínimo en la 'Fecha Vencimiento'
   */
  const handleDates = (date) => {
    console.log('Date ID', date.target.id)
    if (date.target.id == 'fechaRealizado') {
      document.getElementById('fechaVencimiento').setAttribute('min', date.target.value);	
    } else {
      document.getElementById('fechaRealizado').setAttribute('max', date.target.value);
    }
    const fechaRealizado = new Date(date.target.value);
    fechaRealizado.setDate(fechaRealizado.getDate() + 1);
  }

  // Carga los examenes médicos al cargar la página
  useEffect(() => {
    tableExamenes();
  }, []);

  // Actualiza la vista de los archivos al cambiar el estado de archivos
  useEffect(() => {
    createFilesHtml(archivos);
  }, [archivos]);

  return (
    <section>
      <h5 className="text-center text-2xl">Exámenes Médicos</h5>
      <div className="flex justify-end mb-2">
        <button
          onClick={() => handleStateModal("modal_add")}
          className="bg-blue-400 border border-sky-600 rounded-md font-bold p-1 text-white px-10 hover:bg-blue-500 transition-all duration-200"
        >
          Nuevo examen
        </button>
      </div>
      <table className="w-full">
        <thead className="bg-sky-100">
          <tr>
            <th className="border border-sky-300">Tipo</th>
            <th className="border border-sky-300">Realizado</th>
            <th className="border border-sky-300">Vencimiento</th>
            <th className="border border-sky-300">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {examenes.map((examen) => {
            const fechaRealizado = new Date(examen.fechaRealizado);
            fechaRealizado.setDate(fechaRealizado.getDate() + 1);

            const fechaVencimiento = new Date(examen.fechaVencimiento);
            fechaVencimiento.setDate(fechaVencimiento.getDate() + 1);

            return (
              <tr key={examen.id}>
                <td className="border p-1">{examen.examenTitulo}</td>
                <td className="border p-1">
                  {fechaRealizado.toLocaleDateString("es-ES")}
                </td>
                <td className="border p-1">
                  {fechaVencimiento.toLocaleDateString("es-ES")}
                </td>
                <td className="border p-1 text-center">
                  <button
                    className="bg-sky-200 border border-sky-300 rounded-md text-gray-600 font-bold p-1 px-10 hover:bg-sky-300 transition-all duration-200"
                    onClick={() => handleStateModal("modal_view", examen.id)}
                  >
                    Ver
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal para cargar un nuevo examen */}
      <div
        id="modal_add"
        className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden items-center justify-center"
      >
        <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
          <h2 className="text-xl font-semibold mb-4">Nuevo Examen Médico</h2>
          <form onSubmit={handleSubmitExamen}>
            <section className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700">
                  Examen Título{" "}
                  <span className="text-red-600">
                    <small>*</small>
                  </span>
                </label>
                <select
                  name="examenTitulo"
                  value={formData.examenTitulo}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Examen Periodico">Examen Periodico</option>
                  <option value="Examen Preocupacional">
                    Examen Preocupacional
                  </option>
                  <option value="Otro">Otro</option>
                </select>
                {error?.examenTitulo && (
                  <div className="invalid-feedback text-red-600 text-sm font-medium">
                    {error?.examenTitulo}
                  </div>
                )}
              </div>

              <Formfield
                label="Días de Reposo"
                labelClass="block text-gray-700 font-bold text-gray-700"
                type="number"
                name="diasReposo"
                value={formData.diasReposo}
                onChange={handleFormChange}
                classes="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ingrese la cantidad de dias"
                error={error?.diasReposo}
                required={true}
              />

              <Formfield
                label="Fecha Realizado"
                labelClass="block text-gray-700 font-bold text-gray-700"
                type="date"
                name="fechaRealizado"
                id="fechaRealizado"
                value={formData.fechaRealizado}
                onChange={(event) => {handleFormChange(event); handleDates(event)}}
                classes="w-full p-2 border border-gray-300 rounded-md"
                error={error?.fechaRealizado}
                required={true}
              />

              <Formfield
                label="Fecha de Vencimiento"
                labelClass="block text-gray-700 font-bold text-gray-700"
                type="date"
                name="fechaVencimiento"
                id="fechaVencimiento"
                value={formData.fechaVencimiento}
                onChange={(event) => {handleFormChange(event); handleDates(event)}}
                classes="w-full p-2 border border-gray-300 rounded-md"
                error={error?.fechaVencimiento}
                required={true}
              />

              <div className="col-span-2">
                <label className="block font-bold text-gray-700">
                  Observación <small>(Opcional)</small>
                </label>
                <textarea
                  name="observacion"
                  value={formData.observacion}
                  onChange={handleFormChange}
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
                    id="fileExamenes"
                    hidden
                    multiple
                    onChange={handleFileChange}
                  />
                  <button
                    className="bg-blue-400 border border-sky-600 rounded-md font-bold p-1 text-white px-10 hover:bg-blue-500 transition-all duration-200"
                    onClick={() => handleClick("fileExamenes")}
                  >
                    Subir archivos
                  </button>
                </div>
                <div id="archivosExamenesMedicos" className="space-y-4"></div>
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
                onClick={() => handleSubmitExamen()}
                className="bg-green-400 border border-green-600 text-sm rounded-md font-bold p-1 text-white px-10 hover:bg-green-500 transition-all duration-200"
              >
                Agregar Examen
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal para visualizar el examen */}
      <div
        id="modal_view"
        className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden items-center justify-center"
      >
        <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
          <h2 className="text-xl font-semibold mb-4">Examen Médico</h2>
          <section className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-semibold mr-2">Examen Titulo:</p>
              <p id="examenTitulo">Examen Periodico</p>
            </div>
            <div>
              <p className="font-semibold mr-2">Dias de Reposo:</p>
              <p id="diasReposo">5 días</p>
            </div>
            <div>
              <p className="font-semibold mr-2">Fecha realizado:</p>
              <p id="fechaRealizado">5 días</p>
            </div>
            <div>
              <p className="font-semibold mr-2">Fecha vencimiento:</p>
              <p id="fechaVencimiento">5 días</p>
            </div>

            <div className="col-span-2">
              <label className="block font-bold text-gray-700">Archivos</label>
              <div id="archivosExamenesMedicosView" className="space-y-4"></div>
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
    </section>
  );
};

export default ExamenesMedicos;
