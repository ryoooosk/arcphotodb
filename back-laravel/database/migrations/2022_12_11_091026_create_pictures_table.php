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
        Schema::create('pictures', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('path');
            $table->string('uid');
            // 外部キー制約
            // 1. $table->unsignedBigInteger('カラム名')
            //    foreign('カラム名')->references('参照カラム名')->on('参照テーブル名')
            // 2. foreignId('カラム名')->constrained()
            // (親と子テーブルのカラム同士が同タイプである必要あり。idカラムは"unsignedBigInteger")
            // 'foreign'や'foreignId'だと'unsignedBigInteger'しか対応してないっぽい。それ以外のカラムタイプで外部キー制約を行う場合はどうすればよい？？。'id'に'uid'を入れてもいいけどautoincrementを解除するのと、カラムタイプ変更が効くか。それか別の'user_id'カラムを主キーにしたらいけるか？。
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pictures');
    }
};
