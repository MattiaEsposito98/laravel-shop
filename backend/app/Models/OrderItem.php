<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderItem extends Model
{
    use SoftDeletes;

    protected $fillable = ['order_id', 'product_id', 'quantity', 'price'];

    // Relazione corretta con Order (un orderItem appartiene a un ordine)
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Relazione corretta con Product (un orderItem appartiene a un prodotto)
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
