<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_items', 'product_id', 'order_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($product) {  //è un evento del modello che viene attivato prima che un prodotto venga eliminato.
            // Soft delete su tutti gli order_items associati al prodotto
            $product->orderItems()->delete();

            // Controlla gli ordini associati e li elimina se non hanno più prodotti attivi
            foreach ($product->orders as $order) {
                if ($order->products()->count() == 0) {
                    $order->delete(); // Soft delete dell'ordine
                }
            }
        });
    }
}
