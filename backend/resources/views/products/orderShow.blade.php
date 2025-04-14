@extends('layouts.master')

@section('content')
    {{-- @dd($order) --}}
    <div class="container">
        <h1 class="text-center m-3">Dettagli dell'Ordine</h1>
        <div class="d-md-flex m-3 justify-content-around align-items-center">

            <div>
                <p
                    class="text-center fs-2 fw-bold p-2 
              @if ($order->status === 'in attesa') bg-warning 
              @elseif ($order->status === 'completato') bg-success 
              @elseif ($order->status === 'cancellato') bg-danger @endif">
                    Stato: {{ $order->status }}
                </p>
            </div>

            <div class="table-responsive">
                <table class="table table-hover align-middle shadow-sm rounded" style="background-color: #f8f9fa;">
                    <thead class="table-primary text-center">
                        <tr>
                            <th scope="col">User ID</th>
                            <th scope="col">Nome Utente</th>
                            <th scope="col">Email dell'Utente</th>
                            <th scope="col">Ordine ID</th>
                            <th scope="col">Totale Ordine</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr>
                            <td><strong>{{ $order->user->id }}</strong></td>
                            <td>{{ $order->user->name }}</td>
                            <td>{{ $order->user->email }}</td>
                            <td>#{{ $order->id }}</td>
                            <td><span class="badge bg-success">€ {{ number_format($order->total, 2, ',', '.') }}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

        <div class="d-flex justify-content-center mt-5">
            <table class="table table-hover table-striped shadow-sm text-center">
                <thead class="table-danger">
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
