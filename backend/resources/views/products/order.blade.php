@extends('layouts.master')

@section('title', 'Ordini')

@section('content')
    <div class="container d-flex flex-column justify-content-around" style="height: 80vh;">
        {{-- @dd($orders) --}}
        <div class="row">
            <h1 class="mb-4">Ordini</h1>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Nome utente</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($orders as $order)
                        <tr>
                            <td>{{ $order->user_id }}</td>
                            <td>{{ $order->user->name }}</td>
                            <td>€{{ number_format($order->total, 2) }}</td>
                            <td>{{ $order->status }}</td>
                        </tr>
                        {{-- @foreach ($order->products as $product)
                            <td>{{ $product->name }}</td>
                        @endforeach --}}
                    @endforeach
                </tbody>
            </table>

            <div class="d-flex justify-content-center mb-3">
                {{ $orders->links() }}
            </div>
        </div>
    </div>
@endsection
