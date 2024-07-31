<?php

use App\Http\Controllers\API\PaymentController;
use App\Http\Controllers\API\PropertyController;
use App\Http\Controllers\API\TenantController;
use App\Http\Controllers\API\UnitController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\LeasesController;
use Illuminate\Support\Facades\Route;


Route::group([
    'middleware' => 'auth:sanctum',
], function () {
    Route::apiResource('/properties', PropertyController::class);
    Route::apiResource('/tenants', TenantController::class);
    Route::apiResource('/units', UnitController::class);
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/leases', LeasesController::class);
    Route::apiResource('/payments', PaymentController::class);
    Route::get('/user', [UserController::class, 'userLogin']);
});
