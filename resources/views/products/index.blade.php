@extends('layouts.master')

@section('content')
    <div class="container mt-6 d-flex flex-column justify-content-between" style="height: 80vh;">
        <div class="row">
            @foreach ($products as $product)
                <div class="col-md-4 mt-6 mb-4">
                    <x-card :product="$product" />
                </div>
            @endforeach
        </div>

        <!-- Mostra i link della paginazione -->
        <div class="d-flex justify-content-center mb-3">
            {{ $products->links() }}
        </div>
    </div>
@endsection
