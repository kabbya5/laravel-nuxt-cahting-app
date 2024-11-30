<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ChatController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/users', function (Request $request) {
    $users = User::get();
    return response()->json($users);
});


Route::controller(AuthController::class)->group(function(){
    Route::post('/signup', 'register');
    Route::post('/login', 'login');
});

Route::middleware(['custom.sanctum','auth:sanctum'])->group(function(){
    Route::post('/logout', [AuthController::class,'logout']);

    Route::controller(ChatController::class)->group(function(){
        Route::get('/chats/{friend_id}','messages');
    });
});








