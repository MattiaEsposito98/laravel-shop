<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartItemController extends Controller
{

    public function index()
    {
        $user = Auth::user();

        // Recupera tutti gli articoli del carrello dell'utente autenticato
        $cartItems = CartItem::where('user_id', $user->id)->get();

        return response()->json($cartItems);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $user = Auth::user();

        // Controllo se l'articolo è presente nel carello
        $cartItem = CartItem::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->first();


        if ($cartItem) {
            // Se già presente, aggiorna la quantità
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            // Altrimenti crea una nuova riga
            $cartItem = CartItem::create([
                'user_id' => $user->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }

        return response()->json($cartItem, 201);
    }
}
