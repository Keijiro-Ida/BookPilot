<?php

namespace App\Libs;

use Illuminate\Support\Facades\Log;
use Exception;
use DateTime;

class ChatGptApi
{
    public function execute($headers, $data, $endpoint)
    {
            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, $endpoint);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

            $response = curl_exec($ch);

            curl_close($ch);

            $result = json_decode($response, true);

            return $result;
    }
}
