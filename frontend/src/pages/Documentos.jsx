import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Formfield from "../components/Formfield";
import axios from "axios";

const Documentos = () => {
  const [documento, setDocumento] = useState([]);
  const [error, setError] = useState(null);
  const [archivos, setArchivos] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const listaDocumentos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.get(
        `http://localhost:8000/api/documento/usuario/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDocumento(response.data.documento);
    } catch (error) {
      console.error("Error al cargar los documentos ", error);
    }
  };

  const handleStateModal = (id, documentoId = null) => {
    event.preventDefault();
    const modal = document.getElementById(id);
    modal.classList.toggle("hidden");
    modal.classList.toggle("flex");

    if (id === "modal_view") {
      const docVariable = documento.find((doc) => doc.id === documentoId);
      if (docVariable) {
        document.getElementById("documentoTitulo").textContent =
          docVariable.titulo_documento;
        document.getElementById("fecha_otorgado").textContent =
          docVariable.fecha_otorgado;
        document.getElementById("observacion").textContent =
          docVariable.observacion;
      }
      // Archivos
      const archivosContainer = document.getElementById(
        "archivosDocumentosView"
      );
      archivosContainer.innerHTML = "";
      for (let i = 0; i < docVariable.archivos.length; i++) {
        const archivo = docVariable.archivos[i];
        const article = document.createElement("article");
        const spanName = document.createElement("span");
        const spanDownload = document.createElement("span");
        spanName.className =
          "bg-gray-100 p-1 border border-blue-200 border-r-0 rounded-md rounded-tr-none rounded-br-none";
        spanName.textContent = archivo.name;
        spanDownload.className =
          "p-1 bg-blue-100 border border-blue-200 border-l-0 rounded-md rounded-tl-none rounded-bl-none text-blue-500 hover:bg-blue-200 transition-all duration-150 cursor-pointer";
        spanDownload.textContent = "Descargar";
        spanDownload.addEventListener("click", () =>
          window.open(
            `http://localhost:8000/api/documento/download/${archivo.name}`
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
    titulo_documento: "",
    fecha_otorgado: "",
    fecha_vencimiento: "",
    observacion: "",
    usuario_id: id,
    archivos: [],
  });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitDocumento = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      formData.archivos = archivos;
      const response = await axios.post(
        "http://localhost:8000/api/documento/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { mensaje, documento } = response.data;

      handleStateModal("modal_add");

      setFormData({
        titulo_documento: "",
        fecha_otorgado: "",
        fecha_vencimiento: "",
        observacion: "",
        usuario_id: id,
      });
      setError(null);

      setDocumento(documento);

    } catch (error) {
      if (error.response && error.response.data) {
        setError(
          error.response.data.errors || {
            general: "Error al agregar el documento",
          }
        );
      } else {
        setError({ general: "Error al agregar el documento" });
      }
      console.error("Error al agregar el documento", error);
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    let nuevosArchivos = Array.from(e.target.files);

    // Verificar que los archivos sean png, jpg o pdf y mostrar un error si no lo son
    const tiposPermitidos = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "application/pdf",
    ];

    let archivosInvalidos = nuevosArchivos.filter(
      (archivo) => !tiposPermitidos.includes(archivo.type)
    );

    if (archivosInvalidos.length > 0) {
      let errorArchivo = {
        archivos: "Solo se permiten archivos png, jpg, jpeg o pdf",
      };
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

  const createFilesHtml = (files) => {
    const archivosContainer = document.getElementById("archivosDocumento");
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

  useEffect(() => {
    createFilesHtml(archivos);
  }, [archivos]);

  const calcularEstadoVencimiento = (fechaVencimiento) => {
    const fechaActual = new Date();
    const fechaVenc = new Date(fechaVencimiento);
    const diferenciaEnDias = Math.floor(
      (fechaVenc - fechaActual) / (1000 * 60 * 60 * 24)
    );

    if (diferenciaEnDias < 0) {
      return "Vencido";
    } else if (diferenciaEnDias <= 7) {
      return "Por vencer";
    } else {
      return "Vigente";
    }
  };

  /**
   * Cuando escucha un cambio en las fechas, si es la 'Fecha Otorgado', coloca un atributo mínimo en la 'Fecha Vencimiento'
   */
  const handleDates = (date) => {
    if (date.target.id == 'fechaOtorgado') {
      document.getElementById('fechaVencimiento').setAttribute('min', date.target.value);	
    } else {
      document.getElementById('fechaOtorgado').setAttribute('max', date.target.value);
    }
    const fechaOtorgado = new Date(date.target.value);
    fechaOtorgado.setDate(fechaOtorgado.getDate() + 1);
  }

  useEffect(() => {
    listaDocumentos();
  }, []);

  return (
    <section>
      <h5 className="text-center text-2xl">Documentos</h5>
      <button
        onClick={() => handleStateModal("modal_add", null)}
        className="bg-blue-400 border border-sky-600 rounded-md font-bold p-1 text-white px-10 hover:bg-blue-500 transition-all duration-200"
      >
        Nuevo Documento
      </button>
      <div className="overflow-x-auto mt-3">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Documento
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Observación
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Vencimiento
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {documento.map((doc) => (
              <tr key={doc.id}>
                <td className="border p-1">{doc.titulo_documento}</td>
                <td className="border p-1">{doc.observacion}</td>
                <td className="border p-1">
                  <span
                    className={`ml-2 ${
                      calcularEstadoVencimiento(doc.fecha_vencimiento) ===
                      "Vencido"
                        ? "text-red-500 "
                        : calcularEstadoVencimiento(doc.fecha_vencimiento) ===
                          "Vigente"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {calcularEstadoVencimiento(doc.fecha_vencimiento)}
                  </span>
                </td>

                <td className="border p-1 text-center">
                  <button
                    className="bg-sky-200 border border-sky-300 rounded-md text-gray-600 font-bold p-1 px-10 hover:bg-sky-300 transition-all duration-200"
                    onClick={() => handleStateModal("modal_view", doc.id)}
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visualizar el documento */}
      <div
        id="modal_view"
        className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden items-center justify-center"
      >
        <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
          <h2 className="text-xl font-semibold mb-4">Documentos</h2>
          <section className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-semibold mr-2">Documento Titulo:</p>
              <p id="documentoTitulo">Documento</p>
            </div>
            <div>
              <p className="font-semibold mr-2">Fecha Otorgado:</p>
              <p id="fecha_otorgado">Fecha Otorgado</p>
            </div>
            <div>
              <p className="font-semibold mr-2">Fecha Vencimiento:</p>
              <p id="fecha_vencimiento">Fecha Vencimiento</p>
            </div>
            <div>
              <p className="font-semibold mr-2">Observación:</p>
              <p id="observacion">Observación</p>
            </div>
            <div className="col-span-2">
              <label className="block font-bold text-gray-700">Archivos</label>
              <div id="archivosDocumentosView" className="space-y-4"></div>
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

      {/* Formulario de carga */}
      <div
        id="modal_add"
        className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden items-center justify-center"
      >
        <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
          <h2 className="text-xl font-semibold mb-4">Nuevo Documento</h2>
          <form onSubmit={handleSubmitDocumento}>
            <section className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700">
                  Documento Título{" "}
                  <span className="text-red-600">
                    <small>*</small>
                  </span>
                </label>
                <select
                  name="titulo_documento"
                  value={formData.titulo_documento}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Licencias de Conducir">
                    Licencias de Conducir
                  </option>
                  <option value="Curriculum Vitae">Curriculum Vitae</option>
                  <option value="Otro">Otro</option>
                </select>
                {error?.titulo_documento && (
                  <div className="invalid-feedback text-red-600 text-sm font-medium">
                    {error?.titulo_documento}
                  </div>
                )}
              </div>

              <Formfield
                label="Fecha otorgado"
                labelClass="block text-gray-700 font-bold"
                type="date"
                name="fecha_otorgado"
                id="fechaOtorgado"
                value={formData.fecha_otorgado}
                onChange={(event) => {handleFormChange(event); handleDates(event)}}
                classes="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ingrese la fecha"
                error={error?.fecha_otorgado}
                required={true}
              />

              <Formfield
                label="Fecha vencimiento"
                labelClass="block text-gray-700 font-bold"
                type="date"
                name="fecha_vencimiento"
                id="fechaVencimiento"
                value={formData.fecha_vencimiento}
                onChange={(event) => {handleFormChange(event); handleDates(event)}}
                classes="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ingrese la fecha de vencimiento"
                error={error?.fecha_vencimiento}
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
                  placeholder="Ingrese una observación"
                ></textarea>
                {error?.observacion && (
                  <div className="invalid-feedback text-red-600 text-sm font-medium">
                    {error?.observacion}
                  </div>
                )}
              </div>

              <div className="col-span-2">
                <label className="block font-bold text-gray-700">
                  Archivos <small>(Opcional)</small>
                </label>
                <div className="mb-5">
                  <input
                    type="file"
                    id="fileDocumento"
                    hidden
                    multiple
                    onChange={handleFileChange}
                  />
                  <button
                    className="bg-blue-400 border border-sky-600 rounded-md font-bold p-1 text-white px-10 hover:bg-blue-500 transition-all duration-200"
                    onClick={() => handleClick("fileDocumento")}
                  >
                    Subir archivos
                  </button>
                </div>
                <div id="archivosDocumento" className="space-y-4"></div>
                {error?.archivos && (
                  <div className="invalid-feedback text-red-600 text-sm font-medium">
                    {error?.archivos}
                  </div>
                )}
              </div>
            </section>

            {error?.general && (
              <div className="text-red-600 text-sm font-medium my-2">
                {error.general}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Agregar Documento
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleStateModal("modal_add")}
              >
                Cerrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Documentos;
