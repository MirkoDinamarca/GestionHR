<?php

namespace App\Http\Controllers;

use App\Models\Locaciones;
use Illuminate\Http\Request;

class LocacionController extends Controller
{
    /**
     * Trae todas aquellas locaciones que estén activas.
     */
    public function getAll() {
        $locaciones = Locaciones::where('activo', 1)->get();
        return response()->json($locaciones);
    }
}
