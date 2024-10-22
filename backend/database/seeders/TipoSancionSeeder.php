<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoSancionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tipo_sanciones')->insert(
            [
                [
                    'nombre' => 'Ausencia sin aviso',
                    'activo' => 1,
                ],
                [
                    'nombre' => 'Desvío de manejo',
                    'activo' => 1,
                ],
                [
                    'nombre' => 'Desvío de ruta',
                    'activo' => 1,
                ],
                [
                    'nombre' => 'Incumplimiento de conducta laboral',
                    'activo' => 1,
                ],
                [
                    'nombre' => 'Incumplimiento de protocolo COVID-19',
                    'activo' => 1,
                ],
                [
                    'nombre' => 'Llegada tarde',
                    'activo' => 1,
                ],
                [
                    'nombre' => 'Retirarse de la base/oficina sin aviso',
                    'activo' => 1,
                ],
                [
                    'nombre' => 'Suspensión sin goce de haberes',
                    'activo' => 1,
                ],
                [
                    'nombre' => 'Transporte de cargas inseguro',
                    'activo' => 1,
                ]
            ]
        );
    }
}
