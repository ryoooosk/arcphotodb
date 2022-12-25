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
        Schema::create('picture_user', function (Blueprint $table) {
            $table->unsignedBigInteger('picture_id');
            $table->unsignedBigInteger('user_id');
            $table->primary(['picture_id','user_id']);

            $table->foreign('picture_id')->references('id')->on('pictures')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('picture_user');
    }
};
