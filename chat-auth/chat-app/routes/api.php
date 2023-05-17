<?php

use App\Http\Controllers\DriverController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('create-user' , [UserController::class , 'register']);
Route::post('sign-user' , [UserController::class , 'sign_in']);
Route::post('create-driver' , [DriverController::class , 'register']);
Route::post('sign-driver' , [DriverController::class , 'sign_in']);



Route::middleware('auth:sanctum')->group(function ()
{
Route::post('create-room' , [RoomController::class , 'create_room']);
Route::post('create-message' , [MessageController::class , 'create_message']);
Route::post('get-rooms' , [RoomController::class , 'return_rooms']);
Route::post('logout' , [UserController::class , 'logout']);
Route::post('get-users' , [UserController::class , 'get_users']);
Route::post('get-drivers' , [DriverController::class , 'get_drivers']);

    
});
