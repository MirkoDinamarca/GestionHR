<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArchivosExamenes extends Model
{
    use HasFactory;

    protected $table = 'archivos_examenes';

    protected $fillable = [
        'name',
        'examen_id',
    ];

    public function examen() {
        return $this->belongsTo(Examenes::class, 'examen_id');
    }
}
