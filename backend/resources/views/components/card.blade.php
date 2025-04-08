<a href="{{ route('products.show', $product->id) }}" class="text-decoration-none text-dark">
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0 h-100 d-flex">
            <div class="col-md-4">
                <img src="{{ $product->image ? asset('storage/' . $product->image) : 'https://media.istockphoto.com/id/2153801420/it/foto/mano-che-tiene-la-bottiglia-bianca-di-shampoo-o-balsamo-per-capelli-su-sfondo-beige-spazio-di.jpg?s=2048x2048&w=is&k=20&c=6ERtOEt0hK39GkF0iQunumY9t6dZc_YepjcAjNbqYMg=' }}"
                    class="img-fluid rounded-start h-100" alt="{{ $product->name }}" style="object-fit: cover;">
            </div>
            <div class="col-md-8">
                <div class="card-body d-flex flex-column justify-content-between" style="height: 160px;">
                    <h5 class="card-title">{{ $product->name }}</h5>
                    <span>Disponibili: {{ $product->stock }}</span>
                    <p class="card-text">
                        <small class="text-body-secondary">Prezzo:
                            {{ $product->price }}</small>
                    </p>
                </div>
            </div>
        </div>
    </div>
</a>
