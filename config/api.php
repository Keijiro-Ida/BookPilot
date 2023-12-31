<?php

return [

    /*
    |--------------------------------------------------------------------------
    | View Storage Paths
    |--------------------------------------------------------------------------
    |
    | Most templating systems load templates from disk. Here you may specify
    | an array of paths that should be checked for your views. Of course
    | the usual Laravel view path has already been registered for you.
    |
    */

    'gpt' => [
        'key' => env('GPT_API_KEY'),
        'model' => env('GPT_MODEL'),
        'endpoint' => 'https://api.openai.com/v1/chat/completions',
    ],

];
