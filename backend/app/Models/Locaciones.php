<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Locaciones extends Model
{
    use HasFactory;
    protected $table = 'locaciones';

    protected $fillable = [
        'nombre',
        'activo',
    ];

    public function sanciones() {
        return $this->hasMany(Sanciones::class, 'locacion_id');
    }

}
