<?php

namespace App\Http\Controllers;

use App\Models\FamiliaEmpleado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Documento;
use App\Models\ArchivosDocumento;
use Illuminate\Support\Facades\Hash;

class DocumentoController extends Controller
{   
    public function store(Request $request) {
        $request->validate([
            'titulo_documento' => 'required|string',
            'fecha_otorgado' => 'required|date',
            'fecha_vencimiento' => 'required|date',
            'observacion' => 'required|string',
            'archivos.*' => 'file|mimes:jpg,png,pdf|max:2048'
        ]);

        $documento = Documento::create([
            'titulo_documento' => $request->titulo_documento,
            'fecha_otorgado' => $request->fecha_otorgado,
            'fecha_vencimiento' => $request->fecha_vencimiento,
            'observacion' => $request->observacion,
            'usuario_id' => $request->usuario_id,
        ]);

        if ($request->hasFile('archivos')) {
            foreach ($request->file('archivos') as $archivo) {
                $nombreArchivo = time() . '_' . $archivo->getClientOriginalName();
                $archivo->move(public_path('archivos_documento'), $nombreArchivo);
                ArchivosDocumento::create([
                    'name' => $nombreArchivo,
                    'documento_id' => $documento->id
                ]);
            }
        }
        
        $documento = Documento::where('usuario_id', $request->usuario_id)->get();
        $documento->load('archivos');

        return response()->json([
            'mensaje' => 'Documento creado',
            'documento' => $documento
        ]);
    }

    public function getUserDocumento($id) {
        $documento = Documento::where('usuario_id', $id)->get();
        $documento->load('archivos');
        return response()->json([
            'documento' => $documento
        ]);
    }

    public function download_file($filename) {
        return response()->download(public_path('archivos_documento/' . $filename));
    }

    }
