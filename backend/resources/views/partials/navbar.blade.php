<div class="container-full bg-warning">
    <div class="container-sm d-flex justify-content-between align-items-center">
        <div>
            {{-- Profilo --}}
            <div class="dropdown-container d-flex align-items-center gap-3">
                @if (Auth::check())
                    <select name="dropdown" id="dropdown" class="styled-dropdown dropdown-label"
                        onchange="handleDropdownChange(this)">
                        <option value="" disabled selected>{{ Auth::user()->name }}</option>
                        <option value="{{ route('profile.edit') }}">👤 Profilo</option>
                        <option value="{{ route('products.eliminated') }}">🗑️ Prodotti eliminati</option>
                        <option value="{{ route('products.create') }}">➕ Aggiungi prodotto</option>
                        <option value="{{ route('products.order') }}">📦Ordini</option>
                    </select>
                @else
                    <select class="styled-dropdown dropdown-label" disabled>
                        <option selected>Ospite</option>
                    </select>
                @endif

                {{-- Homepage --}}
                <a class="btn btn-outline-dark mb-2" href="{{ route('products.index') }}">Homepage</a>
            </div>


            <script>
                function handleDropdownChange(dropdown) {
                    const value = dropdown.value;

                    if (value) {
                        window.location.href = value; // Reindirizza alla pagina selezionata
                    }
                }
            </script>

            <style>
                /* Stile per il contenitore del menù */
                .dropdown-container {
                    max-width: 300px;
                    margin: 20px auto;
                    font-family: Arial, sans-serif;
                }

                /* Etichetta del dropdown */
                .dropdown-label {
                    display: block;
                    font-size: 1rem;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 8px;
                }

                /* Stile del select */
                .styled-dropdown {
                    text-align: center;
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background: #dfcb1a;
                    font-size: 1rem;
                    cursor: pointer;
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                }

                /* Cambiamento colore al passaggio del mouse */
                .styled-dropdown:hover {
                    border-color: #007bff;
                }

                /* Indicatore a freccia personalizzato */
                .styled-dropdown:focus {
                    outline: none;
                    border-color: #007bff;
                    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
                }
            </style>
        </div>


        {{-- Form --}}
        <form action="{{ route('products.search') }}" method="GET" class="mb-4 d-flex gap-2 align-items-center mt-2">
            <input type="text" name="query" class="form-control mt-2" placeholder="Cerca prodotto..."
                value="{{ request('query') }}">
            <button type="submit" class="btn btn-primary mt-2">Cerca</button>
        </form>
    </div>
</div>
