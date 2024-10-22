<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArchivosSanciones extends Model
{
    use HasFactory;
    protected $table = 'archivos_sanciones';

    protected $fillable = [
        'name',
        'sancion_id',
    ];

    public function sancion() {
        return $this->belongsTo(Examenes::class, 'sancion_id');
    }
}
