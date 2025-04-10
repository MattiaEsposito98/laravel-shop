<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductsController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
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
Route::post('login', [AuthenticatedSessionController::class, 'store']);
