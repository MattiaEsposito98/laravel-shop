<?php

use App\Http\Controllers\Api\ProductsController;
use Illuminate\Routing\Route;

Route::apiResource('api/products', ProductsController::class);
