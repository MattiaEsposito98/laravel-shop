<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CartItemController extends Controller
{

    public function index()
    {
        try {
            $user = auth()->user();
            Log::info('Utente:', ['user' => $user]);

            $cartItems = CartItem::with('product')
                ->where('user_id', $user->id)
                ->get();

            return response()->json($cartItems);
        } catch (\Exception $e) {
            Log::error('Errore nel recupero carrello: ' . $e->getMessage());
            return response()->json(['error' => 'Errore interno'], 500);
        }
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
