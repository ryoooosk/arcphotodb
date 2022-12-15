<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'chiyoda',
        'minato',
        'shinjuku',
        'shibuya'
    ];

    public function pictures() {
        return $this->belongsToMany(Picture::class);
    }
}
