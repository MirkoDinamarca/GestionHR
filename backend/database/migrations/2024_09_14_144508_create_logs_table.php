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
        Schema::create('logs', function (Blueprint $table) {
            $table->id();
            $table->string('mensaje');
            $table->string('adicional')->nullable();
            $table->unsignedBigInteger('usuario_id')->nullable();
            $table->string('evento'); // create, update, delete
            $table->unsignedBigInteger('referencia_id')->nullable();
            $table->string('reference_type')->nullable(); // Tipo de modelo afectado (por ejemplo, 'usuarios', 'capacitaciones', 'puestos', etc.)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logs');
    }
};
