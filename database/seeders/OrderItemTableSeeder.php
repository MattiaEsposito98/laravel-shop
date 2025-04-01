<?php

namespace Database\Seeders;

use App\Models\OrderItem;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class OrderItemTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create(); // Inizializza Faker

        // Ottieni tutti gli ordini
        $orders = Order::all();
        $products = Product::all();

        foreach ($orders as $order) {
            for ($i = 0; $i < rand(1, 3); $i++) { // Ogni ordine può avere da 1 a 3 articoli
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $products->random()->id, // Seleziona un prodotto casuale
                    'quantity' => rand(1, 3), // Quantità casuale da 1 a 3
                    'price' => $faker->randomFloat(2, 1, 100), // Prezzo casuale tra 1 e 100
                ]);
            }
        }
    }
}
