<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'email',
        'uid',
    ];

    // ↓pictures-users(多対1)の多側だから複数形
    public function pictures() {
        return $this->hasMany(Picture::class);
    }

    public function favorites() {
        return $this->hasMany(Favorite::class);
    }

    public function is_bookmark($picture_id) {
        return $this->favorites()->where('picture_id',$picture_id)->exist();
    }

    public function favorite_pictures() {
        return $this->belongsToMany(Picture::class, 'picture_user');
    }
}
