<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class CardController extends Controller
{
    private $baseUrl = 'http://jsonserver:3000';

    public function store(Request $request)
    {
        $newCard = [
            'question' => $request->input('question'),
            'answers' => $request->input('answers'), // array: correct first
            'board_id' => $request->input('board_id') // ensure board_id is included
        ];

        $response = Http::post($this->baseUrl . '/cards', $newCard);
        if ($response->successful()) {
            Log::info('New card created:', $newCard);
            return response()->json(['success' => true, 'card' => $response->json()]);
        } else {
            Log::error('Failed to create card', ['response' => $response->body()]);
            return response()->json(['success' => false, 'error' => 'Failed to create card'], 500);
        }
    }

    public function list()
    {
        $response = Http::get($this->baseUrl . '/cards');

        if ($response->successful()) {
            $cards = $response->json();
            return response()->json(['cards' => $cards]);
        } else {
            Log::error('Failed to fetch cards', ['response' => $response->body()]);
            return response()->json(['cards' => []], 500);
        }
    }

    public function listBy(Request $request)
    {
        $boardId = $request->query('board_id');
        $boardName = $request->query('board_name');

        if ($boardId) {
            $response = Http::get($this->baseUrl . '/cards', ['board_id' => $boardId]);
        } elseif ($boardName) {
            $boardResp = Http::get($this->baseUrl . '/boards', ['title' => $boardName]);
            if ($boardResp->successful() && count($boardResp->json()) > 0) {
                $board = $boardResp->json()[0];
                $response = Http::get($this->baseUrl . '/cards', ['board_id' => $board['id']]);
            } else {
                return response()->json(['cards' => []]);
            }
        } else {
            return response()->json(['cards' => []]);
        }

        if ($response->successful()) {
            $cards = $response->json();
            return response()->json(['cards' => $cards]);
        } else {
            Log::error('Failed to fetch cards by filter', ['response' => $response->body()]);
            return response()->json(['cards' => []], 500);
        }
    }
}