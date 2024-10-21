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
        Schema::create('archivos_documento', function (Blueprint $table) {
           
                $table->id();
                $table->string('archivo');
                $table->unsignedBigInteger('documento_id');
                $table->foreign('documento_id')->references('id')->on('documento')->onDelete('cascade');
                $table->timestamps();
            });
        
       
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('archivos_documento');
    }
};
