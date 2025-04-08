@extends('layouts.master')

@section('title', 'Prodotti Eliminati')

@section('content')
    <div class="container mt-5">
        <h1 class="mb-4">Prodotti Eliminati</h1>
        <div class="row">
            @foreach ($eliminated_products as $eliminated_product)
                <div class="col-md-4 mb-4">

                    <x-eliminated-card :eliminated_product="$eliminated_product" />
                </div>
            @endforeach
        </div>
    </div>
@endsection
