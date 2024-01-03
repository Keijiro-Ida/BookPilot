<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('google_id')->nullable()->comment('google Books ID');
            $table->string('title')->nullable()->comment('タイトル');
            $table->string('author')->nullable()->comment('著者');
            $table->datetime('publication_date')->nullable()->comment('出版日');
            $table->string('cover_image_url')->nullable()->comment('画像URL');
            $table->string('buy_link')->nullable()->comment('購入リンク');
            $table->text('description')->nullable()->comment('説明');
            $table->string('publisher')->nullable()->comment('出版社');
            $table->string('price')->nullable()->comment('価格');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
