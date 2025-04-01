<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;


class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(Faker $faker): void
    {
        for ($i = 0; $i <= 30; $i++) {
            $newProduct = new Product();
            $newProduct->name = $faker->sentence(3);
            $newProduct->description = $faker->text(500);
            $newProduct->price = $faker->randomFloat(2, 1, 100);
            $newProduct->stock = $faker->numberBetween(0, 100);
            $newProduct->image = 'https://media.istockphoto.com/id/2153801420/it/foto/mano-che-tiene-la-bottiglia-bianca-di-shampoo-o-balsamo-per-capelli-su-sfondo-beige-spazio-di.jpg?s=612x612&w=is&k=20&c=hbmYkwFtTfBVuwfYKjIkRgrtkm8ZomblfptBHQOtKTU=';
            $newProduct->save();
        }
    }
}
