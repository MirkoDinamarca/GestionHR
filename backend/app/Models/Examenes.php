<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examenes extends Model
{
    use HasFactory;
    protected $table = 'examenes_medicos';

    protected $fillable = [
        'examenTitulo',
        'diasReposo',
        'fechaRealizado',
        'fechaVencimiento',
        'observacion',
        'usuario_id',
    ];

    public function archivos() {
        return $this->hasMany(ArchivosExamenes::class, 'examen_id');
    }
}
