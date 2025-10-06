<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BoardController;
use Illuminate\Http\Request;

Route::post('/boards', [BoardController::class, 'store']);
Route::get('/list', [BoardController::class, 'list'])->name("list");

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');