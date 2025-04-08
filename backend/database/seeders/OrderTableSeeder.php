<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class OrderTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create(); // Inizializza Faker

        // Ottieni tutti gli utenti
        $users = User::all();

        foreach ($users as $user) {
            for ($i = 0; $i < rand(1, 3); $i++) { // Ogni utente può avere da 1 a 3 ordini
                Order::create([
                    'user_id' => $user->id,
                    'total' => $faker->randomFloat(2, 10, 500), // Totale casuale tra 10 e 500
                    'status' => $faker->randomElement(['in attesa', 'completato', 'cancellato']), // Stato casuale
                ]);
            }
        }
    }
}
