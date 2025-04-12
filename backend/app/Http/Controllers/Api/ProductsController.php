<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\CssSelector\XPath\Extension\FunctionExtension;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['cartItems', 'orderItems'])->get();
        return response()->json([
            "success" => "true",
            "data" => $products
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Recupera il prodotto in base all'id
        $product = Product::find($id);

        // Verifica se il prodotto esiste
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Prodotto non trovato'
            ], 404);
        }

        // Restituisci i dettagli del prodotto
        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function register(Request $request)
    {
        try {
            // Valida i dati ricevuti
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6|confirmed',
            ]);

            // Crea un nuovo utente
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
            ]);

            // Restituisci una risposta JSON
            return response()->json([
                'success' => true,
                'message' => 'Registrazione completata con successo!',
                'data' => $user,
            ], 201);

            // In caso di errore:
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nella registrazione: ' . $e->getMessage(),
            ], 500);
        }
    }
}
