import Formfield from "./Formfield";
import { useState } from "react";
const Integrante = ({index, integrante, handleChangeIntegrante, handleDeleteIntegrante}) => {

  return (
    <div className="grid grid-cols-6 gap-4 bg-gray-100 p-3 py-5 rounded-md border">
      <div className="col-span-6 text-end">
        <button className="bg-red-500 px-4 text-white font-medium rounded-md hover:bg-red-600 transition-all duration-150" onClick={() => handleDeleteIntegrante(index)}>
          Eliminar
        </button>
      </div>

      <Formfield
        divClass="col-span-1"
        label="Apellido del integrante"
        labelClass="block font-bold text-gray-700"
        type="text"
        name='apellido'
        value={integrante.apellido}
        onChange={(e) => handleChangeIntegrante(index, 'apellido', e.target.value)}
        classes="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Ingrese el apellido del integrante"
      />

      <Formfield
        divClass="col-span-1"
        label="Nombre del integrante"
        labelClass="block font-bold text-gray-700"
        type="text"
        name='nombre'
        value={integrante.nombre}
        onChange={(e) => handleChangeIntegrante(index, 'nombre', e.target.value)}
        classes="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Ingrese el nombre del integrante"
      />

      <div className="col-span-1">
        <label htmlFor="" className="block font-bold text-gray-700">
          ¿Convive?
        </label>
        <select
          name='convive'
          value={integrante.convive}
          onChange={(e) => handleChangeIntegrante(index, 'convive', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">-- Seleccione --</option>
          <option value="1">Si</option>
          <option value="0">No</option>
        </select>
      </div>

      <div className="col-span-1">
        <label className="block font-bold text-gray-700">
          Vínculo
        </label>
        <select
          name='vinculo'
          value={integrante.vinculo}
          onChange={(e) => handleChangeIntegrante(index, 'vinculo', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">-- Seleccione --</option>
          <option value="esposa">Esposa/so</option>
          <option value="hermano">hermano/na</option>
          <option value="hijo">hijo/ja</option>
        </select>
      </div>

      <Formfield
        divClass="col-span-1"
        label="DNI del integrante"
        labelClass="block font-bold text-gray-700"
        type="text"
        name='dni'
        value={integrante.dni}
        onChange={(e) => handleChangeIntegrante(index, 'dni', e.target.value)}
        classes="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Ingrese el DNI del integrante"
      />

      <div className="col-span-2">
        <label htmlFor="" className="block font-bold text-gray-700">
          ¿Es apto para el seguro de vida?
        </label>
        <select
          name='seguro_vida'
          value={integrante.seguro_vida}
          onChange={(e) => handleChangeIntegrante(index, 'seguro_vida', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">-- Seleccione --</option>
          <option value="1">Si</option>
          <option value="0">No</option>
        </select>
      </div>

      <Formfield
        divClass="col-span-2"
        label="En caso de seleccionar 'Si' ingrese el porcentaje"
        labelClass="block font-bold text-gray-700"
        type="number"
        name='porcentaje_seguro_vida'
        value={integrante.porcentaje_seguro_vida}
        onChange={(e) => handleChangeIntegrante(index, 'porcentaje_seguro_vida', e.target.value)}
        classes="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Ingrese un porcentaje"
      />
    </div>
  );
};

export default Integrante;
