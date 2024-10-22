export const handleFileChange = (e, archivos, setArchivos, setError) => {
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
    setError(errorArchivo);
    return;
  } else {
    setError([]);
  }

  setArchivos([...archivos, ...nuevosArchivos]);
};

/**
 * Elimina un archivo de la lista de archivos
 */
export const handleDeleteFile = (name, idContainer, archivos, setArchivos) => {
  //   const archivosContainer = document.getElementById("archivosExamenesMedicos");
  const archivosContainer = document.getElementById(idContainer);
  const files = archivos.filter((archivo) => archivo.name !== name);
  archivosContainer.innerHTML = "";
  setArchivos(files);
};

/**
 * Genera el HTML de los archivos subidos
 */
export const createFilesHtml = (files, setArchivos, idContainer, view, ruta = '') => {
  const archivosContainer = document.getElementById(idContainer);
  archivosContainer.innerHTML = "";
  if (!view) {
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
      spanDelete.addEventListener("click", () => handleDeleteFile(archivo.name, idContainer, files, setArchivos));
      article.className = "flex";
      article.appendChild(spanName);
      article.appendChild(spanDelete);
      archivosContainer.appendChild(article);
    }
  } else {
    for (let i = 0; i < files.length; i++) {
      const archivo = files[i];
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
          // `http://localhost:8000/api/examenes/download/${archivo.name}`
          `${ruta}${archivo.name}`
        )
      );
      article.className = "flex";
      article.appendChild(spanName);
      article.appendChild(spanDownload);
      archivosContainer.appendChild(article);
    }
  }
};
