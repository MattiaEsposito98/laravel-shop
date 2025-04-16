<?php

use App\Http\Controllers\Api\CartItemController;
use App\Http\Controllers\Api\OrderController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductsController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;

// Rotte api
Route::apiResource('products', ProductsController::class);

// Registrazione utente
Route::post('register/user', [ProductsController::class, 'register']);


// Questa rotta restituirà i dati dell'utente autenticato
Route::middleware('auth:api')->get('/user', function (Request $request) {
  return $request->user();
});


// Login
Route::post('/login', [AuthController::class, 'login']);

// Per l'utente
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'getUser']);

// Login
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Carello
Route::middleware('auth:sanctum')->get('/cart-items', [CartItemController::class, 'index']);

//Aggiungere prdotti al carello
Route::middleware('auth:sanctum')->post('/cart-items', [CartItemController::class, 'store']);

// Rotta per rimuovere un signolo elemento
Route::middleware('auth:sanctum')->patch('/cart-items/{product}', [CartItemController::class, 'decrease']);

// Rotta per rimuovere un intero prodotto 
Route::middleware('auth:sanctum')->delete('/cart-items/{id}', [CartItemController::class, 'removeFromCart']);

// Rotta per svuotare carrello
Route::delete('/clear-cart', [CartItemController::class, 'clearCart'])->middleware('auth:sanctum');


// Ordine
// Route per creare un ordine
Route::middleware('auth:sanctum')->post('/order', [OrderController::class, 'store']);

// Rotta per vedere gli ordini
Route::get('/userOrders', [OrderController::class, 'userOrders'])->middleware('auth:sanctum');

// Rotta per i dettagli dell'ordine
Route::get('/orders/{order}', [OrderController::class, 'detailsOrder']);
