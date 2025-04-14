@extends('layouts.master')

@section('content')
    {{-- @dd($order) --}}
    <div class="container">
        <h1 class="text-center m-3">Dettagli dell'Ordine</h1>
        <div class="d-flex m-3 justify-content-around align-items-center">

            <div>
                <p
                    class="text-center fs-2 fw-bold p-2 
              @if ($order->status === 'in attesa') bg-warning 
              @elseif ($order->status === 'completato') bg-success 
              @elseif ($order->status === 'cancellato') bg-danger @endif">
                    Stato: {{ $order->status }}
                </p>
            </div>

            <div>
                <table class="table table-bordered text-center" style="background-color: #e3f2fd;">
                    <thead class="table-primary">
                        <tr>
                            <th>User ID</th>
                            <th>Nome Utente</th>
                            <th>Email dell'utente</th>
                            <th>Ordine ID</th>
                            <th>Totale dell'ordine</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ $order->user->id }}</td>
                            <td>{{ $order->user->name }}</td>
                            <td>{{ $order->user->email }}</td>
                            <td>{{ $order->id }}</td>
                            <td>{{ $order->total }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="d-flex justify-content-center mt-5">
            <table class="table table-hover table-striped shadow-sm text-center">
                <thead class="bg-dark text-white">
                    <tr>
                        <th>Nome del prodotto</th>
                        <th>Quantità</th>
                        <th>Prezzo singolo</th>
                        <th>Prezzo * Quantità</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($order->orderItems as $item)
                        <tr>
                            <td>{{ $item->product->name }}</td>
                            <td>{{ $item->quantity }}</td>
                            <td>€{{ number_format($item->price, 2) }}</td>
                            <td>€{{ number_format($item->price * $item->quantity, 2) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection
