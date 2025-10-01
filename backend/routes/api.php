<?php
use App\Http\Controllers\BoardController;

Route::post('/boards', [BoardController::class, 'store']);