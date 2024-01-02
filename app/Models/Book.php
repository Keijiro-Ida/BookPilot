<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
      'google_id',
      'title',
      'author',
      'publication_date',
      'cover_image_url',
      'buy_link',
      'description',
      'publisher',
      'price',
    ];
}
