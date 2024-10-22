<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArchivosDocumento extends Model
{
    use HasFactory;

    protected $table = 'archivos_documento';

    protected $fillable = [
        'name',
        'documento_id',
    ];

    public function documento() {
        return $this->belongsTo(Documento::class, 'documento_id');
    }
}
