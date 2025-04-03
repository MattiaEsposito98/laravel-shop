@extends('layouts.master')

@section('content')
    @dd($product)

    <div class="container">
        <div>
            <h1>{{ $product->name }}</h1>
            <a href="{{ route('products.edit', $product->id) }}" class="btn btn-outline-warning">Modifica</a>
        </div>
        <p>{{ $product->description }}</p>
        <p>Prezzo: {{ $product->price }}€</p>
        <p>Disponibilità: {{ $product->stock }}</p>
        <img class= "w-25"
            src="{{ $product->image ? asset('storage/' . $product->image) : 'https://media.istockphoto.com/id/2153801420/it/foto/mano-che-tiene-la-bottiglia-bianca-di-shampoo-o-balsamo-per-capelli-su-sfondo-beige-spazio-di.jpg?s=2048x2048&w=is&k=20&c=6ERtOEt0hK39GkF0iQunumY9t6dZc_YepjcAjNbqYMg=' }}"
            alt="{{ $product->name }}">
    </div>
@endsection
