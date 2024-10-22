<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sanciones extends Model
{
    use HasFactory;
    protected $table = 'sanciones';

    protected $fillable = [
        'solicitante_id',
        'tipo_sancion_id',
        'diasSuspension',
        'fechaOtorgado',
        'locacion_id',
        'observacion',
        'usuario_id',
    ];

    public function solicitante()
    {
        return $this->belongsTo(User::class, 'solicitante_id');
    }

    public function tipo()
    {
        return $this->belongsTo(TipoSancion::class, 'tipo_sancion_id');
    }

    public function locacion()
    {
        return $this->belongsTo(Locaciones::class, 'locacion_id');
    }

    public function archivos()
    {
        return $this->hasMany(ArchivosSanciones::class, 'sancion_id');
    }
}
