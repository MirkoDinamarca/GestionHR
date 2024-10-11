<?php

namespace App\Http\Controllers;

use App\Models\Examenes;
use Illuminate\Http\Request;

class ExamenesController extends Controller
{
    public function store(Request $request) {
        // echo '<pre>';
        // var_dump($request->all());
        // echo '</pre>';
        $request->validate([
            'examenTitulo' => 'required|string',
            'diasReposo' => 'required|integer',
            'fechaRealizado' => 'required|date',
            'fechaVencimiento' => 'required|date',
            'observacion' => 'required|string',
        ]);

        Examenes::create([
            'examenTitulo' => $request->examenTitulo,
            'diasReposo' => $request->diasReposo,
            'fechaRealizado' => $request->fechaRealizado,
            'fechaVencimiento' => $request->fechaVencimiento,
            'observacion' => $request->observacion,
            'usuario_id' => $request->usuario_id,
        ]);

        // Traer todos los examenes de ese usuario
        $examenes = Examenes::where('usuario_id', $request->usuario_id)->get();

        return response()->json([
            'mensaje' => 'Examen creado Exitosamente',
            'examenes' => $examenes
        ]);
    }

    public function getUserExamenes($id) {
        $examenes = Examenes::where('usuario_id', $id)->get();
        return response()->json([
            'examenes' => $examenes
        ]);
    }
}
