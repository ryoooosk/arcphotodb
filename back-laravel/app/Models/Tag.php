<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'type'
    ];

    public function pictures() {
        // ↓中間テーブル名は２つのテーブルをアルファベット順に"_"で繋いだものになる
        return $this->belongsToMany(Picture::class, 'tag_picture');
    }
}
