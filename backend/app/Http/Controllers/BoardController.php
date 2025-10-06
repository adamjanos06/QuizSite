<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Laravel\Pail\ValueObjects\Origin\Console;

class BoardController extends Controller
{
    private $baseUrl = 'http://jsonserver:3000';

    public function store(Request $request)
    {
        $newBoard = [
            'title' => $request->input('title'),
            'imgURL' => $request->input('imgURL'),
            'color' => $request->input('color')
        ];

        $response = Http::post($this->baseUrl . '/boards', $newBoard);

        if ($response->successful()) {
            Log::info('New board created:', $newBoard);
            return response()->json(['success' => true, 'board' => $response->json()]);
        } else {
            Log::error('Failed to create board', ['response' => $response->body()]);
            return response()->json(['success' => false, 'error' => 'Failed to create board'], 500);
        }
    }

    public function list()
    {
        $response = Http::get($this->baseUrl . '/boards');

        if ($response->successful()) {
            $boards = $response->json();
            return response()->json(['boards' => $boards]);
        } else {
            Log::error('Failed to fetch boards', ['response' => $response->body()]);
            return response()->json(['boards' => []], 500);
        }
    }
}
