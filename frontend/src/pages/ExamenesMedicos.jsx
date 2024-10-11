import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Formfield from "../components/Formfield";
import axios from "axios";

const ExamenesMedicos = () => {
  const [examenes, setExamenes] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

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
    }
  };

  const [formData, setFormData] = useState({
    examenTitulo: "",
    diasReposo: "",
    fechaRealizado: "",
    fechaVencimiento: "",
    observacion: "",
    usuario_id: id,
  });

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
      const response = await axios.post(
        "http://localhost:8000/api/examenes/add",
        formData,
        {
          headers: {
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
  useEffect(() => {
    tableExamenes();
  }, []);

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
                value={formData.fechaRealizado}
                onChange={handleFormChange}
                classes="w-full p-2 border border-gray-300 rounded-md"
                error={error?.fechaRealizado}
                required={true}
              />

              <Formfield
                label="Fecha de Vencimiento"
                labelClass="block text-gray-700 font-bold text-gray-700"
                type="date"
                name="fechaVencimiento"
                value={formData.fechaVencimiento}
                onChange={handleFormChange}
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
            </section>
            <div className="flex justify-end gap-3">
              <button
                className="bg-red-500 text-white px-4 py-2 text-sm font-bold tracking-wide rounded"
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
