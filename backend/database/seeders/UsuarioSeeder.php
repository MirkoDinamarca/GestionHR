<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('usuarios')->insert(
            [
                [
                    'nombre' => 'Mirko',
                    'apellido' => 'Dinamarca',
                    'legajo' => '0000',
                    'dni' => '41609029',
                    'cuil' => '20416090298',
                    'password' => 'dinamarcamirko.19@gmail.com',
                    'email' => bcrypt('123456'),
                    'telefono' => 2994044950,
                    'genero' => 'Masculino',
                    'fecha_ingreso' => Date('2021-09-14'),
                    'fecha_nacimiento' => Date('1999-12-10'),
                    'foto_perfil' => '',
                    'calle' => 'Calle falsa',
                    'numero' => 123,
                    'ciudad' => 'Neuquén',
                    'cp' => '8300',
                    'provincia' => 'Neuquén',
                    'nacionalidad' => 'Argentina',
                    'estado_civil' => 'Soltero',
                    'created_at' => Date('2021-09-14'),
                ],
                [
                    'nombre' => 'Agustina',
                    'apellido' => 'Kilapi',
                    'legajo' => '0001',
                    'dni' => '43891187',
                    'cuil' => '20438911876',
                    'email' => 'laura.kilapi@est.fi.uncoma.edu.ar',
                    'password' => bcrypt('123456'),
                    'telefono' => 2994044950,
                    'genero' => 'Femenino',
                    'fecha_ingreso' => Date('2021-09-14'),
                    'fecha_nacimiento' => Date('1999-12-10'),
                    'foto_perfil' => '',
                    'calle' => 'Calle falsa',
                    'numero' => 123,
                    'ciudad' => 'Fernandez Oro',
                    'cp' => '123',
                    'provincia' => 'Rio Negro',
                    'nacionalidad' => 'Argentina',
                    'estado_civil' => 'Soltero',
                    'created_at' => Date('2021-09-14'),
                ]
            ]
        );
    }
}
