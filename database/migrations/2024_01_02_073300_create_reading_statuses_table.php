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
        Schema::create('reading_statuses', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable()->comment('ユーザーID');
            $table->string('book_id')->nullable()->comment('Book ID');
            $table->integer('reading_status')->comment('読書ステータス');
            $table->integer('rating')->nullable()->comment('レーティング');
            $table->string('review')->nullable()->comment('感想');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reading_statuses');
    }
};
