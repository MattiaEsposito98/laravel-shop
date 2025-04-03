<nav class="navbar bg-body-tertiary">
    <div class="container-sm">
        <div>
            <a class = "me-4" href="{{ route('profile.edit') }}">
                <i class="fa-solid fa-user me-2"></i>{{ Auth::user()->name }}
            </a>

            <a href="{{ route('products.create') }}" class="btn btn-outline-secondary">Aggiungi prodotto</a>
        </div>


        <a class="navbar-brand ms-4" href="{{ route('products.index') }}">Logo</a>
        <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form>

    </div>
</nav>
