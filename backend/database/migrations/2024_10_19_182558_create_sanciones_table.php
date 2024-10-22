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
        Schema::create('sanciones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('solicitante_id');
            $table->foreign('solicitante_id')->references('id')->on('usuarios');
            $table->unsignedBigInteger('tipo_sancion_id');
            $table->foreign('tipo_sancion_id')->references('id')->on('tipo_sanciones');
            $table->integer('diasSuspension');
            $table->date('fechaOtorgado');
            $table->unsignedBigInteger('locacion_id');
            $table->foreign('locacion_id')->references('id')->on('locaciones');
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
        Schema::dropIfExists('sanciones');
    }
};
