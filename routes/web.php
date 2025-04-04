<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ShopController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;


Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';


// Rotte per Admin
Route::middleware(['auth', IsAdmin::class])->group(function () {
    Route::get('/dashboard-admin', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::resource('products', ShopController::class);

    //Rotta per i prodotti elimanti
    Route::get('eliminated_products', [ShopController::class, 'eliminated']);
});

Route::get('/', function () {
    return view('auth.login');
});
