<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductsController;

// Rotte api
Route::apiResource('products', ProductsController::class);

// Registrazione utente
Route::post('register/user', [ProductsController::class, 'register']);
