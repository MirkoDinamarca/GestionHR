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
        Schema::create('examenes_medicos', function (Blueprint $table) {
            $table->id();
            $table->string('examenTitulo');
            $table->integer('diasReposo');
            $table->date('fechaRealizado');
            $table->date('fechaVencimiento');
            $table->string('observacion');
            $table->unsignedBigInteger('usuario_id');
            $table->foreign('usuario_id')->references('id')->on('usuarios');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('examenes_medicos');
    }
};
