<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoSancion extends Model
{
    use HasFactory;
    protected $table = 'tipo_sanciones';

    protected $fillable = [
        'nombre',
        'activo',
    ];

    // Relación con el modelo Sanciones
    public function sanciones()
    {
        return $this->hasMany(Sanciones::class, 'tipo_sancion_id');
    }
}
