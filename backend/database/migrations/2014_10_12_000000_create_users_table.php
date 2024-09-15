<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('apellido');
            $table->string('legajo')->unique();
            $table->string('dni')->unique();
            $table->string('cuil')->unique();
            $table->string('correo')->unique();
            $table->string('clave');
            $table->bigInteger('telefono');
            $table->string('genero');
            $table->date('fecha_ingreso');
            $table->date('fecha_nacimiento');
            $table->string('foto_perfil')->nullable();
            $table->string('calle')->nullable();
            $table->integer('numero')->nullable();
            $table->string('ciudad');
            $table->string('cp');
            $table->string('provincia');
            $table->string('nacionalidad');
            $table->string('estado_civil');
            $table->tinyInteger('activo')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
