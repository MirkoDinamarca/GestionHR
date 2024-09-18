<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function store(Request $request)
    {
        // Validar los datos que se ingresaron
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!$token = JWTAuth::attempt($request->only('email', 'password'))) {
            return response()->json(['mensaje' => 'Credenciales incorrectas'], 401);
        }

        return response()->json([
            'mensaje' => 'Inicio de sesión exitoso',
            'token' => $token,
            'usuario' => auth()->user()
        ]);

    }

    public function destroy()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['mensaje' => 'Cierre de sesión exitoso']);
    }
}
