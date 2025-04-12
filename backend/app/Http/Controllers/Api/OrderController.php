<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $user = auth()->user();
        if (!$user) {
            Log::error('Utente non autenticato');
            return response()->json(['message' => 'Utente non autenticato'], 401);
        }

        // Calcola il prezzo totale dal carrello
        $totalPrice = 0;
        foreach ($user->cartItems as $item) {
            $totalPrice += $item->quantity * $item->product->price;  // Moltiplica quantità per prezzo del prodotto
        }

        // Crea l'ordine
        $order = new Order();
        $order->user_id = $user->id;
        $order->total_price = $totalPrice;
        $order->save();

        // Aggiungi gli articoli all'ordine
        foreach ($user->cartItems as $item) {
            $orderItem = new OrderItem();
            $orderItem->order_id = $order->id;
            $orderItem->product_id = $item->product_id;
            $orderItem->quantity = $item->quantity;
            $orderItem->save();
        }

        // Svuota il carrello dell'utente
        $user->cartItems()->delete();

        return response()->json(['message' => 'Ordine creato con successo']);
    }
}
