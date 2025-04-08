<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create(); // Inizializza Faker

        for ($i = 0; $i < 10; $i++) { // Creiamo 10 utenti
            User::create([
                'name' => $faker->name(),
                'email' => $faker->unique()->safeEmail(),
                'password' => bcrypt('password'), // Password fittizia
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
