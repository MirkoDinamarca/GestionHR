<?php

namespace App\Http\Controllers;

use App\Models\FamiliaEmpleado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User; // Asegúrate de importar tu modelo User
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    /**
     * Obtener el perfil del usuario que está autenticado.
     * (Tiene el middleware de autenticación)
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
            'genero' => 'required|nullable|string',
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

        // Integrantes familiares
        $integrantes = $request->integrantes;

        // Validar que integrantes no sea un arreglo vacio!
        if (empty($integrantes)) {
            return response()->json([
                'mensaje' => 'Debe enviar al menos un integrante'
            ], 400);
        }

        // Validar que cada campo de integrante sea requerido
        foreach ($integrantes as $integrante) {
            if (!isset($integrante['nombre']) || !isset($integrante['apellido']) || !isset($integrante['convive']) || !isset($integrante['vinculo']) || !isset($integrante['dni']) || !isset($integrante['seguro_vida']) || !isset($integrante['porcentaje_seguro_vida'])) {
                return response()->json([
                    'mensaje' => 'Los campos de cada integrante son requeridos'
                ], 400);
            }
        }

        // Validar que al menos uno de los integrantes debe tener seguro de vida
        $seguro_vida = false;
        foreach ($integrantes as $integrante) {
            if ($integrante['seguro_vida']) {
                $seguro_vida = true;
                break;
            }
        }
        if (!$seguro_vida) {
            return response()->json([
                'mensaje' => 'Al menos un integrante debe tener seguro de vida'
            ], 400);
        }

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

        foreach ($integrantes as $integrante) {
            FamiliaEmpleado::create([
                'nombre' => $integrante['nombre'],
                'apellido' => $integrante['apellido'],
                'convive' => $integrante['convive'],
                'vinculo' => $integrante['vinculo'],
                'dni' => $integrante['dni'],
                'seguro_vida' => $integrante['seguro_vida'],
                'porcentaje_seguro_vida' => $integrante['porcentaje_seguro_vida'],
                'usuario_id' => $user->id,
            ]);
        }

        return response()->json([
            'success' => true,
            'mensaje' => 'Usuario creado exitosamente',
            'usuario' => $user
        ], 201);
    }
    /**
     * Obtener todos los usuarios
     */
    public function getAllUser()
    {
        $usuarios = User::all();

        return response()->json($usuarios);
    }

    public function getUserId($id)
    {
        // Encuentra al usuario junto con sus familiares
        $usuario = User::with('familiares')->find($id); 
    
        if (!$usuario) {
            return response()->json([
                'mensaje' => 'No se encuentra el usuario'
            ], 404);
        }
    
        return response()->json($usuario);
    }
    

    public function getLastLegajo() {
        $usuario = User::orderBy('legajo', 'desc')->first();

        if (!$usuario) {
            return response()->json([
                'mensaje' => 'No se encuentra el usuario'
            ], 404);
        }

        return response()->json($usuario->legajo);
    }
}
