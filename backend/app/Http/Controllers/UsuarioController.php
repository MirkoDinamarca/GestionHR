<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User; // Asegúrate de importar tu modelo User
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    /**
     * Obtener el perfil del usuario que está autenticado.
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

    /**
     * Crear un nuevo usuario.
     */
    public function createUser(Request $request)
    {
        
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'legajo' => 'required|string|unique:usuarios',
            'dni' => 'required|string|unique:usuarios',
            'cuil' => 'required|string|unique:usuarios',
            'email' => 'required|string|email|unique:usuarios',
            'password' => 'required|min:8',
            'telefono' => 'nullable|integer',
            'genero' => 'nullable|string',
            'fecha_ingreso' => 'required|date',
            'fecha_nacimiento' => 'required|date',
            'calle' => 'nullable|string',
            'numero' => 'nullable|integer',
            'ciudad' => 'required|string',
            'cp' => 'required|string',
            'provincia' => 'required|string',
            'nacionalidad' => 'required|string',
            'estado_civil' => 'required|string',
        ]);

        $user = User::create([
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'legajo' => $request->legajo,
            'dni' => $request->dni,
            'cuil' => $request->cuil,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'telefono' => $request->telefono,
            'genero' => $request->genero,
            'fecha_ingreso' => $request->fecha_ingreso,
            'fecha_nacimiento' => $request->fecha_nacimiento,
            'calle' => $request->calle,
            'numero' => $request->numero,
            'ciudad' => $request->ciudad,
            'cp' => $request->cp,
            'provincia' => $request->provincia,
            'nacionalidad' => $request->nacionalidad,
            'estado_civil' => $request->estado_civil,
            'activo' => 1, 
        ]);

        return response()->json([
            'mensaje' => 'Usuario creado exitosamente',
            'usuario' => $user
        ], 201);
    }
    /**
     * Obtener todos los usuarios
     */
    public function getAllUser() {
        $usuarios = User::all(); 

        return response()->json($usuarios); 
    }

    public function getUserId($id)
{
    $usuario = User::find($id); 

    if (!$usuario) {
        return response()->json([
            'mensaje' => 'No se encuentra el usuario'
        ], 404);
    }

    return response()->json($usuario);
}

}
