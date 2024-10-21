<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    use HasFactory;
    protected $table = 'documento';

    protected $fillable = [
        'titulo_documento',
        'fecha_otorgado',
        'fecha_vencimiento',
        'observacion',
        'usuario_id', 
    ];

    public function archivos() {
        return $this->hasMany(ArchivosDocumento::class, 'documento_id');
    }
}
