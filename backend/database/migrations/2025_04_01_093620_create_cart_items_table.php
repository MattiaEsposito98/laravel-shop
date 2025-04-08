<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cart_items', function (Blueprint $table) {  //Carrello
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // ID utente
            $table->foreignId('product_id')->constrained()->onDelete('cascade'); // ID prodotto
            $table->integer('quantity')->default(1); // Quantità dell'articolo
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};
