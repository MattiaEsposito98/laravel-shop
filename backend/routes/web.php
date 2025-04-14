<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ShopController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Assicurati che questa riga sia presente e corretta
require __DIR__ . '/auth.php';

// Rotte per Admin
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard-admin', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::resource('products', ShopController::class);
    Route::get('eliminated_products', [ShopController::class, 'eliminated'])->name('products.eliminated');
    Route::get('search_product', [ShopController::class, 'search'])->name('products.search');
    Route::get('orders', [OrderController::class, 'index'])->name('products.order');
    Route::get('orders/{order}', [OrderController::class, 'show'])->name('products.orderShow');
});

Route::get('/', function () {
    return view('auth.login');
});
