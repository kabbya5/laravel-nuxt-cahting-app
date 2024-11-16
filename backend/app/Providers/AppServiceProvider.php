<?php

namespace App\Providers;

use App\Events\UserSessionChanged;
use App\Listeners\BroadCastUserLoginNotification;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;

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
        Event::listen(
            UserSessionChanged::class,
            BroadCastUserLoginNotification::class,
        );
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
    }
}
