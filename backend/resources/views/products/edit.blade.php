@extends('layouts.master')

@section('title', 'Modifica prodotto')

@section('content')
    <div class="container mt-6">

        <form action="{{ route('products.update', $product->id) }}" method="POST" class="p-4 shadow rounded bg-light"
            enctype="multipart/form-data">
            @csrf @method('PUT')

            <h3 class="mb-4 text-primary">Aggiungi un Prodotto</h3>

            <!-- Nome del prodotto -->
            <div class="mb-3">
                <label for="name" class="form-label fw-bold">Nome Prodotto</label>
                <input type="text" name="name" id="name" class="form-control" value="{{ $product->name }}"
                    required>
            </div>

            <!-- Descrizione -->
            <div class="mb-3">
                <label for="description" class="form-label fw-bold">Descrizione</label>
                <textarea name="description" id="description" class="form-control" rows="3" required>{{ $product->description }}</textarea>
            </div>


            <!-- Prezzo -->
            <div class="mb-3">
                <label for="price" class="form-label fw-bold">Prezzo (€)</label>
                <input type="number" name="price" id="price" class="form-control" value="{{ $product->price }}"
                    step="0.01" required>
            </div>

            <!-- Stock -->
            <div class="mb-3">
                <label for="stock" class="form-label fw-bold">Quantità in magazzino</label>
                <input type="number" name="stock" id="stock" class="form-control" value="{{ $product->stock }}"
                    required>
            </div>

            {{-- Image --}}

            <div class="mb-3">
                <div>
                    <label for="image">Immagine</label>
                    <input type="file" name="image" id="image">
                </div>
                <img class="w-25"
                    src="{{ $product->image ? asset('storage/' . $product->image) : 'https://media.istockphoto.com/id/2153801420/it/foto/mano-che-tiene-la-bottiglia-bianca-di-shampoo-o-balsamo-per-capelli-su-sfondo-beige-spazio-di.jpg?s=2048x2048&w=is&k=20&c=6ERtOEt0hK39GkF0iQunumY9t6dZc_YepjcAjNbqYMg=' }}"
                    alt="Copertina videogioco">
            </div>

            <!-- Pulsante di invio -->
            <button type="submit" class="btn btn-primary w-100">Salva Prodotto</button>
        </form>

    @endsection
