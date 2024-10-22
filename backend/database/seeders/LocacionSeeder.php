<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('locaciones')->insert(
            [
                [
                    'nombre' => 'Base 1',
                    'activo' => 1,
                ],
                [
                    'nombre' => 'Base 2',
                    'activo' => 1,
                ],
                [
                    'nombre' => 'Base 3',
                    'activo' => 1,
                ]
            ]
        );
    }
}
