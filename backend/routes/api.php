<?php

use App\Http\Controllers\API\RentHouseController;
use App\Http\Controllers\API\RoomController;
use App\Http\Controllers\API\TenantController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;



Route::group([
    'middleware' => 'auth:sanctum',
], function () {
    Route::apiResource('/renthouses', RentHouseController::class);
    Route::apiResource('/tenants', TenantController::class);
    Route::apiResource('/rooms', RoomController::class);
    Route::apiResource('/users', UserController::class);
    Route::get('/user', [UserController::class, 'userLogin']);
});
Route::post('/login', [AuthenticatedSessionController::class, 'login']);