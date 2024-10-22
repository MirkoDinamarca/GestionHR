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
        Schema::create('archivos_sanciones', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('sancion_id');
            $table->foreign('sancion_id')->references('id')->on('sanciones')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('archivos_sanciones');
    }
};
