@extends('layouts.master')

@section('content')
    <div class="container my-5 border">
        <div class="d-flex justify-content-between align-items-center">
            <h1 class="display-4">{{ $product->name }}</h1>
            <div>
                <a href="{{ route('products.edit', $product->id) }}" class="btn btn-warning btn-lg">Modifica</a>
                <form action="{{ route('products.destroy', $product->id) }}" method="POST">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-outline-danger">Elimina</button>
                </form>
            </div>


        </div>
        <div class="d-flex justify-content-around my-4">
            <img class="img-fluid w-25"
                src="{{ $product->image ? asset('storage/' . $product->image) : 'https://media.istockphoto.com/id/2153801420/it/foto/mano-che-tiene-la-bottiglia-bianca-di-shampoo-o-balsamo-per-capelli-su-sfondo-beige-spazio-di.jpg?s=2048x2048&w=is&k=20&c=6ERtOEt0hK39GkF0iQunumY9t6dZc_YepjcAjNbqYMg=' }}"
                alt="{{ $product->name }}">
            <div>
                <p class="fs-5"><strong>Prezzo:</strong> €{{ number_format($product->price, 2, ',', '.') }}</p>
                <p class="fs-5"><strong>Disponibilità:</strong> {{ $product->stock }}</p>
            </div>
        </div>
        <div class="mb-4">
            <p class="lead">{{ $product->description }}</p>
        </div>

        <h3 class="mt-5">Ordini in cui è presente questo prodotto:</h3>

        @if ($product->orders->isNotEmpty())
            <table class="table table-striped table-bordered mt-3">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Acquirente</th>
                        <th scope="col">ID Ordine</th>
                        <th scope="col">Totale</th>
                        <th scope="col">Stato</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($product->orders as $order)
                        <tr>
                            <td>{{ $order->user->name }}</td>
                            <td>{{ $order->id }}</td>
                            <td>€{{ number_format($order->total, 2, ',', '.') }}</td>
                            <td>{{ ucfirst($order->status) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @else
            <div class="alert alert-info mt-3" role="alert">
                Questo prodotto non è stato ordinato da nessuno.
            </div>
        @endif
    </div>
@endsection
