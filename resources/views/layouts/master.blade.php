<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    @vite(['resources/css/app.css', 'resources/js/app.js'])

</head>


<body class="bg-warning-subtle d-flex flex-column min-vh-100">
    {{-- Navbar --}}
    <header>
        @include('partials.navbar')
    </header>

    {{-- Main --}}
    <main class="container-fluid flex-grow-1">
        @yield('content')
    </main>

    {{-- Footer --}}
    <footer>
        @include('partials.footer')
    </footer>

</body>


</html>
