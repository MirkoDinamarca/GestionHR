<?php

namespace App\Http\Controllers;

use App\Models\ArchivosExamenes;
use App\Models\Examenes;
use Illuminate\Http\Request;

class ExamenesController extends Controller
{
    public function store(Request $request) {
        
        $request->validate([
            'examenTitulo' => 'required|string',
            'diasReposo' => 'required|integer',
            'fechaRealizado' => 'required|date',
            'fechaVencimiento' => 'required|date',
            'observacion' => 'required|string',
            'archivos.*' => 'file|mimes:jpg,png,pdf|max:2048'
        ]);

        $examen = Examenes::create([
            'examenTitulo' => $request->examenTitulo,
            'diasReposo' => $request->diasReposo,
            'fechaRealizado' => $request->fechaRealizado,
            'fechaVencimiento' => $request->fechaVencimiento,
            'observacion' => $request->observacion,
            'usuario_id' => $request->usuario_id,
        ]);

        if ($request->hasFile('archivos')) {
            foreach ($request->file('archivos') as $archivo) {
                $nombreArchivo = time() . '_' . $archivo->getClientOriginalName();
                $archivo->move(public_path('archivos_examenes'), $nombreArchivo);
                ArchivosExamenes::create([
                    'archivo' => $nombreArchivo,
                    'examen_id' => $examen->id
                ]);
            }
        }

        // Traer todos los examenes de ese usuario
        $examenes = Examenes::where('usuario_id', $request->usuario_id)->get();
        $examenes->load('archivos');

        return response()->json([
            'mensaje' => 'Examen creado Exitosamente',
            'examenes' => $examenes
        ]);
    }

    public function getUserExamenes($id) {
        $examenes = Examenes::where('usuario_id', $id)->get();
        $examenes->load('archivos');
        return response()->json([
            'examenes' => $examenes
        ]);
    }

    public function download_file($filename) {
        return response()->download(public_path('archivos_examenes/' . $filename));
    }
}
