<?php

namespace Database\Seeders;

use App\Models\CartItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class CartItemTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(Faker $faker): void
    {
        $users = User::all();
        $products = Product::all();


        foreach ($users as $user) {
            // Genera un numero casuale di prodotti per ciascun utente (da 1 a 5)
            $userProductsCount = rand(1, 5);

            // Seleziona prodotti casuali per l'utente
            for ($i = 0; $i < $userProductsCount; $i++) {
                CartItem::create([
                    'user_id' => $user->id,
                    'product_id' => $products->random()->id, // Seleziona un prodotto casuale
                    'quantity' => rand(1, 3), // Quantità casuale da 1 a 3
                ]);
            }
        }
    }
}
