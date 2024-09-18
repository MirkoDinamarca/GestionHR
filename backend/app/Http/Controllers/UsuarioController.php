<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsuarioController extends Controller
{
    /**
     * Obtener el perfil del usuario que esta autenticado
     */
    public function getUser()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'mensaje' => 'Usuario no autenticado'
            ], 401);
        }
        return response()->json([
            'mensaje' => 'Usuario autenticado',
            'usuario' => $user
        ]);
    }
}
