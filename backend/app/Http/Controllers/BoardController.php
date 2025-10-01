<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class BoardController extends Controller
{
    private $dataFile = storage_path('jsonserver/data/db.json');

    public function store(Request $request)
    {
        $json = json_decode(File::get($this->dataFile), true);

        $newBoard = [
            'title' => $request->input('title'),
            'imgURL' => $request->input('imgURL'),
            'color' => $request->input('color')
        ];

        $json['boards'][] = $newBoard;

        File::put($this->dataFile, json_encode($json, JSON_PRETTY_PRINT));

        return response()->json(['success' => true, 'board' => $newBoard]);
    }
}
