<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExamenesController;
use App\Http\Controllers\LocacionController;
use App\Http\Controllers\SancionController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\DocumentoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'store']);
Route::post('/logout', [AuthController::class, 'destroy'])->middleware('auth:api');
Route::get('/user', [UsuarioController::class, 'getUser'])->middleware('auth:api');

# Usuario
Route::post('/usuarioNuevo', [UsuarioController::class, 'createUser'])->middleware('auth:api');
Route::get('/usuarios/legajo', [UsuarioController::class, 'getLastLegajo'])->middleware('auth:api');
Route::get('/usuarios', [UsuarioController::class, 'getAllUser'])->middleware('auth:api');
Route::get('/usuarios/{id}', [UsuarioController::class, 'getUserId'])->middleware('auth:api');

# Examenes
Route::post('/examenes/add', [ExamenesController::class, 'store'])->middleware('auth:api');
Route::get('/examenes/usuario/{id}', [ExamenesController::class, 'getUserExamenes'])->middleware('auth:api');
Route::get('/examenes/download/{filename}', [ExamenesController::class, 'download_file']);

#Documento
Route::post('/documento/add', [DocumentoController::class, 'store'])->middleware('auth:api');
Route::get('/documento/usuario/{id}', [DocumentoController::class, 'getUserDocumento'])->middleware('auth:api');
Route::get('/documento/download/{filename}', [DocumentoController::class, 'download_file']);

# Sanciones
Route::post('/sanciones/add', [SancionController::class, 'store'])->middleware('auth:api');
Route::post('/sanciones/update/{id}', [SancionController::class, 'update'])->middleware('auth:api');
Route::get('/sanciones/usuario/{id}', [SancionController::class, 'getUserSanciones'])->middleware('auth:api');
Route::get('/sanciones/download/{filename}', [SancionController::class, 'download_file']);

# Tipo de Sanciones
Route::get('/tipo_sanciones', [SancionController::class, 'getAllTipoSancion'])->middleware('auth:api');

# Locaciones
Route::get('/locaciones', [LocacionController::class, 'getAll'])->middleware('auth:api');
