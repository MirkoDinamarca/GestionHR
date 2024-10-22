<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FamiliaEmpleado extends Model
{
    use HasFactory;
    protected $table = 'integrantes_familiar';

    protected $fillable = [
        'nombre',
        'apellido',
        'convive',
        'vinculo',
        'dni',
        'seguro_vida',
        // 'porcentaje_seguro_vida',
        'usuario_id'
    ];
}
