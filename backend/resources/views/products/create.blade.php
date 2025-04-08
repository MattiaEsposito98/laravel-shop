@extends('layouts.master')

@section('title', 'Aggiungi prodotto')

@section('content')
    <div class="container mt-6">

        <form action="{{ route('products.store') }}" method="POST" class="p-4 shadow rounded bg-light"
            enctype="multipart/form-data">
            @csrf

            <h3 class="mb-4 text-primary">Aggiungi un Prodotto</h3>

            <!-- Nome del prodotto -->
            <div class="mb-3">
                <label for="name" class="form-label fw-bold">Nome Prodotto</label>
                <input type="text" name="name" id="name" class="form-control" placeholder="Inserisci il nome"
                    required>
            </div>

            <!-- Descrizione -->
            <div class="mb-3">
                <label for="description" class="form-label fw-bold">Descrizione</label>
                <textarea name="description" id="description" class="form-control" rows="3" placeholder="Inserisci la descrizione"
                    required></textarea>
            </div>

            <!-- Prezzo -->
            <div class="mb-3">
                <label for="price" class="form-label fw-bold">Prezzo (€)</label>
                <input type="number" name="price" id="price" class="form-control" placeholder="Inserisci il prezzo"
                    step="0.01" required>
            </div>

            <!-- Stock -->
            <div class="mb-3">
                <label for="stock" class="form-label fw-bold">Quantità in magazzino</label>
                <input type="number" name="stock" id="stock" class="form-control" placeholder="Inserisci la quantità"
                    required>
            </div>

            {{-- Image --}}

            <div class="mb-3">
                <label for="image">Immagine</label>
                <input type="file" name="image" id="image">
            </div>

            <!-- Pulsante di invio -->
            <button type="submit" class="btn btn-primary w-100">Salva Prodotto</button>
        </form>

    @endsection
