<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Libs\ChatGptApi;
use App\Models\Book;
use DateTime;

use Illuminate\Support\Facades\Log;

class BookController extends Controller
{
    public function search(Request $request) {

        $title = $request['book']['title'];
        // $author = $request['book']['author'];
        $response = [];
        Log::debug($title);
        $response['title'] = $title;
        // $response['author'] = $author;

        $url = 'https://www.googleapis.com/books/v1/volumes?q='.$title.'%20&country=JP&tbm=bks';


        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $res =  curl_exec($ch);
        curl_close($ch);

        $data = json_decode($res, true);
        return response()->json($data);
    }

    public function summarize(Request $request) {

        $title = $request['book']['title'];
        $author = $request['book']['authors'][0];

        $apiKey = config('api.gpt.key');
        $endpoint = config('api.gpt.endpoint');

        $headers = array(
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
        );

        $data = array(
        'model' => config('api.gpt.model'),
        'messages' => [
            [
            "role" => "system",
            "content" => "日本語で要約を教えてください"
            ],

            [
            "role" => "user",
            "content" => $title."の要約を教えてください"
            ],
        ]
        );

       $chatGptApi = new ChatGptApi();
       $result = $chatGptApi->execute($headers, $data, $endpoint);

        Log::debug($result);

        return response()->json($result);
    }

    public function review(Request $request) {

            $title = $request['book']['title'];
            $author = $request['book']['authors'][0];

            $google_id = $request['book']['id'];

            $book = Book::where('google_id', $google_id)->first();
            Log::debug($request);
            if(!isset($book)) {
                $book = new Book();
                $book->title = $title;
                $book->author = $author;
                $book->google_id = $google_id;
                $book->description = $request['book']['description'];
                $book->cover_image_url = $request['book']['imageLinks']['thumbnail'];
                $book->buy_link = $request['book']['infoLink'];
                $book->publication_date = new DateTime($request['book']['publishedDate']);
                $book->publisher = $request['book']['publisher'];
                $book->price = $request['book']['retailPrice'];

                $book->save();
            }

            // $readingStatus = ReadingStatus::where('user_id', $request['user_id'])->where('book_id', $book->id)->first();
            $result = [];
            $result['title'] = $title;

            Log::debug($request);

            return response()->json($result);
    }
}
