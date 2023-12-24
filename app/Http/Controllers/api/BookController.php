<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Log;

class BookController extends Controller
{
    public function search(Request $request) {

        $title = $request['book']['title'];
        $author = $request['book']['author'];
        $response = [];
        Log::debug($title);
        $response['title'] = $title;
        $response['author'] = $author;

        $url = 'https://www.googleapis.com/books/v1/volumes?q='.$title.'%20&country=JP&tbm=bks';


        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $res =  curl_exec($ch);
        curl_close($ch);

        $data = json_decode($res, true);
        return response()->json($data);
    }
}
