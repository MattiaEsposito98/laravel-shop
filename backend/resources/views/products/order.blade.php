@extends('layouts.master')

@section('title', 'Ordini')

@section('content')
    <div class="container d-flex flex-column justify-content-around" style="height: 80vh;">
        {{-- @dd($orders) --}}
        <div class="row">
            <h1 class="mb-4">Ordini</h1>
            <table class="table table-striped table-bordered">
                <thead class="table-success">
                    <tr>
                        <th class="text-center">User ID</th>
                        <th class="text-center">Nome utente</th>
                        <th class="text-center">Total</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Dettagli</th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    @foreach ($orders as $order)
                        <tr>
                            <td class="text-center">{{ $order->user_id }}</td>
                            <td class="text-center">{{ $order->user->name }}</td>
                            <td class="text-center">€{{ number_format($order->total, 2) }}</td>
                            <td class="text-center">{{ $order->status }}</td>
                            <td class="text-center"><a href="{{ route('products.orderShow', $order->id) }}"
                                    class="btn btn-sm btn-info">Vedi Dettagli</a></td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

            <div class="d-flex justify-content-center mb-3">
                {{ $orders->links() }}
            </div>
        </div>
    </div>
@endsection
