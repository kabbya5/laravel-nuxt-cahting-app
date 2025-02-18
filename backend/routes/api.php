<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\FriendShipController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::controller(AuthController::class)->group(function(){
    Route::post('/signup', 'register');
    Route::post('/login', 'login');
});

Route::middleware(['auth:sanctum'])->group(function(){
    Route::post('/logout', [AuthController::class,'logout']);
    Route::post('/add-friend/{friendId}', [FriendShipController::class, 'addFreind']);

    // POST
    Route::controller(PostController::class)->group(function(){
        Route::get('/posts', 'index');
        Route::post('/posts/{post}/like', 'likePost');
        Route::post('/posts/{post}/comments', 'commentPost');
    });

    Route::controller(FriendShipController::class)->group(function() {
        Route::prefix('friends')->group(function() {
            Route::get('/requests', 'getRequestedFriend');
            Route::delete('/requests/{friend_id}', 'deleteRequest');
            Route::get('/find', 'getFindFriends');
            Route::get('/status/{friend}', 'getFriendStatus');
            Route::post('/requests/{friend_id}', 'requestSend');
            Route::post('/confirm/{friend_id}', 'confirm_friend');
            Route::delete('/request/cancle/{frined_id}', 'cancleRequest');
        });
    });
});




