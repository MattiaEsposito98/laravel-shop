<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    // Serve per permettere di assegnare campi al modello CartItem
    protected $fillable = [
        'user_id',
        'product_id',
        'quantity'
    ];

    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->belongsTo(Product::class);
    }
}
