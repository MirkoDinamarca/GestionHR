<?php

namespace App\Http\Controllers;

use App\Models\ArchivosSanciones;
use App\Models\Sanciones;
use App\Models\TipoSancion;
use Illuminate\Http\Request;

class SancionController extends Controller
{
    /**
     * Trae todas aquellos tipo de sancion que estén activas.
     */
    public function getAllTipoSancion()
    {
        $tipoSanciones = TipoSancion::where('activo', 1)->get();
        return response()->json($tipoSanciones);
    }

    public function store(Request $request)
    {

        $request->validate([
            'solicitante' => 'required|integer',
            'tipoSancion' => 'required|integer',
            'diasSuspension' => 'required|integer',
            'fechaOtorgado' => 'required|date',
            'ubicacion' => 'required|integer',
            'archivos.*' => 'file|mimes:jpg,png,pdf|max:2048'
        ]);

        $sancion = Sanciones::create([
            'solicitante_id' => auth()->user()->id,
            'tipo_sancion_id' => $request->tipoSancion,
            'diasSuspension' => $request->diasSuspension,
            'fechaOtorgado' => $request->fechaOtorgado,
            'locacion_id' => $request->ubicacion,
            'observacion' => $request->observacion,
            'usuario_id' => $request->usuario_id,
        ]);

        if ($request->hasFile('archivos')) {
            foreach ($request->file('archivos') as $archivo) {
                $nombreArchivo = time() . '_' . $archivo->getClientOriginalName();
                $archivo->move(public_path('archivos_sanciones'), $nombreArchivo);
                ArchivosSanciones::create([
                    'name' => $nombreArchivo,
                    'sancion_id' => $sancion->id
                ]);
            }
        }

        // Traer todas las sanciones del usuario
        $sanciones = Sanciones::with(['solicitante', 'tipo', 'locacion', 'archivos'])
            ->where('usuario_id', $request->usuario_id)
            ->get();

        return response()->json([
            'mensaje' => 'Sancion creada Exitosamente',
            'sanciones' => $sanciones
        ]);
    }

    public function update(Request $request, $id)
    {
        // Hacer un var_dump de los archivos
        echo '<pre>';
        var_dump($request->all());
        var_dump($request->file('archivos'));
        echo '</pre>';
        /*
        $request->validate(
            [
                'tipoSancion' => 'required|integer',
                'diasSuspension' => 'required|integer',
                'ubicacion' => 'required|integer',
                'archivos.*' => 'file|mimes:jpg,jpeg,png,pdf|max:2048'
            ],
            [
                'tipoSancion.required' => 'El tipo de sanción es obligatorio.',
                'diasSuspension.required' => 'Los días de suspensión son obligatorios.',
                'ubicacion.required' => 'La ubicación es obligatoria.',
                'archivos.*.file' => 'Cada archivo debe ser un archivo válido.',
                'archivos.*.mimes' => 'Los archivos deben ser de tipo jpg, png o pdf.',
                'archivos.*.max' => 'Los archivos no deben superar los 2MB.',
            ]
        );

        $sancion = Sanciones::find($id);
        $tipoSancion = TipoSancion::find($request->tipoSancion);
        $sancion->tipo_sancion_id = $tipoSancion->id;
        $sancion->diasSuspension = $request->diasSuspension;
        $sancion->locacion_id = $request->ubicacion;
        $sancion->observacion = $request->observacion;
        $sancion->save();

        // Eliminar los archivos anteriores
        ArchivosSanciones::where('sancion_id', $sancion->id)->delete();
        // Eliminar los archivos fisicos
        $archivos = public_path('archivos_sanciones');
        foreach (glob($archivos . '/*') as $archivo) {
            unlink($archivo);
        }

        

        // Cargar nuevos archivos
        if ($request->hasFile('archivos')) {
            foreach ($request->file('archivos') as $archivo) {
                $nombreArchivo = time() . '_' . $archivo->getClientOriginalName();
                $archivo->move(public_path('archivos_sanciones'), $nombreArchivo);
                ArchivosSanciones::create([
                    'archivo' => $nombreArchivo,
                    'sancion_id' => $sancion->id
                ]);
            }
        }

        // Traer todas las sanciones del usuario
        $sanciones = Sanciones::where('usuario_id', $request->usuario_id)->get();
        $sanciones->load('archivos');

        return response()->json([
            'mensaje' => 'Sancion actualizada Exitosamente',
            'sanciones' => $sanciones
        ]);
        */
    }

    public function getUserSanciones($id)
    {
        $sanciones = Sanciones::with(['solicitante', 'tipo', 'locacion', 'archivos'])
            ->where('usuario_id', $id)
            ->get();
        return response()->json([
            'sanciones' => $sanciones
        ]);
    }

    public function download_file($filename)
    {
        return response()->download(public_path('archivos_sanciones/' . $filename));
    }
}
