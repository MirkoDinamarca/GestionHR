<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExamenesController;
use App\Http\Controllers\UsuarioController;
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