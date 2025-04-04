<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ShopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $products = Product::with(['cartItems', 'orderItems'])->paginate(9);
        return view('products.index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $product = Product::all();
        return view('products.create', compact('product'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $newProduct = new Product();
        $newProduct->name = $data['name'];
        $newProduct->description = $data['description'];
        $newProduct->price = $data['price'];
        $newProduct->stock = $data['stock'];
        if (array_key_exists('image', $data)) {
            $img_url = Storage::putFile('uploads', $data['image']);
            $newProduct->image = $img_url;
        }
        $newProduct->save();
        return redirect()->route('products.index', $newProduct);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load(['cartItems', 'orderItems', 'orders.user']);  //le tre relazioni
        return view('products.show', compact('product'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return view('products.edit', compact('product'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|max:2048',
        ]);

        // Per aggiornare i campi
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->price = $request->input('price');
        $product->stock = $request->input('stock');

        // Controlla se è stata caricata una nuova immagine
        if ($request->hasFile('image')) {
            // Elimina l'immagine precedente se esiste
            if ($product->image) {
                Storage::delete('public/' . $product->image);
            }

            // Salva la nuova immagine
            $img_url = $request->file('image')->store('uploads', 'public');
            $product->image = $img_url;
        }

        // Salva le modifiche
        $product->save();

        return redirect()->route('products.index')->with('success', 'Prodotto aggiornato con successo!');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::Delete($product->image);
        }
        $product->cartItems()->delete();

        // Scollega il prodotto dagli elementi dell'ordine
        $product->orderItems()->delete();

        // Scollega il prodotto dagli ordini
        $product->orders()->detach();

        // Elimina il prodotto
        $product->delete();

        return redirect()->route('products.index');
    }
}
