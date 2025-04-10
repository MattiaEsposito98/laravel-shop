<?php

namespace App\Providers;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Mantieni la configurazione per il Paginator
        Paginator::useBootstrap();

        // Aggiungi manualmente il caricamento del file api.php
        Route::prefix('api')
            ->middleware('api')
            ->namespace('App\Http\Controllers\Api') // Specifica lo spazio dei nomi del tuo controller API
            ->group(base_path('routes/api.php'));
    }
}
