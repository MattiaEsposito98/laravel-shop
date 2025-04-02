<h1>{{ $product->name }}</h1>
<p>{{ $product->description }}</p>
<p>Prezzo: {{ $product->price }}€</p>
<p>Disponibilità: {{ $product->stock }}</p>
<img src="{{ $product->image }}" alt="{{ $product->name }}">
