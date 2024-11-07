<?php

use App\Events\TestEvent;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BasicJobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::controller(BasicJobController::class)->group(function(){
    Route::get('/job-1','job1');
    Route::get('/job/image/', 'jobImage')->name('job.image');
    Route::post('process/image/', 'processImage')->name('image.process');
});

Route::get('test/event', function() {
    broadcast(new TestEvent());
    return response()->json(['message' => 'Hello']); // Return as JSON
});

Route::controller(AuthController::class)->group(function(){
    Route::post('/signup', 'register');
    Route::post('/login', 'login');
});


