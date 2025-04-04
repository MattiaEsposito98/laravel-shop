<div class="container-full bg-warning">
    <div class="container-sm d-flex justify-content-between align-items-center">
        <div>
            {{-- Profilo --}}
            <a class="me-4" href="{{ route('profile.edit') }}">
                <i class="fa-solid fa-user me-2"></i>{{ Auth::user()->name }}
            </a>
            <a href="{{ route('products.create') }}" class="btn btn-secondary">Aggiungi prodotto</a>
        </div>

        {{-- Logo --}}
        <a class="navbar-brand ms-4 fs-5 border border-dark rounded-circle p-3"
            href="{{ route('products.index') }}">Logo</a>

        {{-- Form --}}
        <form action="{{ route('products.search') }}" method="GET" class="mb-4 d-flex gap-2 align-items-center mt-2">
            <input type="text" name="query" class="form-control mt-2" placeholder="Cerca prodotto..."
                value="{{ request('query') }}">
            <button type="submit" class="btn btn-primary mt-2">Cerca</button>
        </form>
    </div>
</div>
