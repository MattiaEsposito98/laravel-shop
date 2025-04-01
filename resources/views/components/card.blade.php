<div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="{{ $product->image }}" class="img-fluid rounded-start" alt="{{ $product->name }}">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">{{ $product->name }}</h5>
                {{-- <p class="card-text">{{ $product->description }}</p> --}}
                <p class="card-text"><small class="text-body-secondary">Last updated
                        {{ $product->updated_at->diffForHumans() }}</small></p>
            </div>
        </div>
    </div>
</div>
