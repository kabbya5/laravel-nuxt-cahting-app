<?php

use App\Events\UserSessionChanged;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

Route::get('notification', function(){
    event(new UserSessionChanged('User logged in', 'info'));
});
