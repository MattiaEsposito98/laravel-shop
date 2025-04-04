@extends('layouts.master')


@section('content')


    <div class="container mt-6 d-flex flex-column justify-content-around" style="height: 80vh;">
        <div class="row">
            @if (isset($query))
                <h5>Risultati per: "{{ $query }}"</h5>
            @endif

            @if ($products->isEmpty())
                <div class="text-center">
                    <p>Nessun prodotto trovato.</p>
                    <a href="{{ route('products.index') }}" class="btn btn-outline-primary">Torna indietro</a>
                </div>
            @else
                @foreach ($products as $product)
                    <div class="col-md-4">
                        <x-card :product="$product" />
                    </div>
                @endforeach
            @endif

        </div>

        <!-- Mostra i link della paginazione -->
        <div class="d-flex justify-content-center mb-3">
            {{ $products->links() }}
        </div>
    </div>
@endsection
