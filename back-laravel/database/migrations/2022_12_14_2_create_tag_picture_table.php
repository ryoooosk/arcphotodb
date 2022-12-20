<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tag_picture', function (Blueprint $table) {
            $table->unsignedBigInteger('picture_id');
            $table->unsignedBigInteger('tag_id');
            // ↓picture_idとtag_idの組み合わせが一意であることを保証する
            $table->primary(['picture_id','tag_id']);

            $table->foreign('picture_id')->references('id')->on('pictures')->onDelete('cascade');
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tag_picture');
    }
};
