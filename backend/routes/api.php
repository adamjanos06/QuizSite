<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\CardController;
use Illuminate\Http\Request;

Route::post('/boards', [BoardController::class, 'store']);
Route::get('/list', [BoardController::class, 'list'])->name("list");

Route::post('/cards', [CardController::class, 'store']);
Route::get('/cards', [CardController::class, 'list']);
Route::get('/cards/by', [CardController::class, 'listBy']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');