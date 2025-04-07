@props(['eliminated_product'])

<div class="card shadow-sm">
    <div class="card-body">
        <h5 class="card-title"> {{ $eliminated_product->name }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Numero di ordini:
            {{ count($eliminated_product->orders) }}</h6>

        @if ($eliminated_product->orders->isNotEmpty())
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
                    @foreach ($eliminated_product->orders as $order)
                        <tr>
                            <td>{{ $order->user ? $order->user->name : 'Utente non disponibile' }}</td>
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
</div>
