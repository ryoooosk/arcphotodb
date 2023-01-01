<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function changeUserFavorite($uid, Request $request) {
        // $requestのままだとidを拾えないvalueやキーで値を指定しないといけない？
        // リクエストのデータ構造を知る必要あり
        $picture_id = $request->picture_id;
        if($picture_id) {
            $user_id = User::where('uid', $uid)->value('id');
            $user = new User();
            $is_favorite = $user->find($user_id)->is_favorite($picture_id);
            if(!$is_favorite) {
                User::find($user_id)->favorite_pictures()->attach($picture_id);
                return response()->json(["message" => "Add Favorite"]);
            }
            if($is_favorite) {
                User::find($user_id)->favorite_pictures()->detach($picture_id);
                return response()->json(["message" => "Remove Favorite"]);
            }
        } else {
            return response()->json(["message" => "Not Found PitureId"]);
        }
    }

    public function getUserFavorites($uid) {
        $user_id = User::where('uid',$uid)->value('id');
        $data = User::find($user_id)->favorite_pictures;
        return response()->json($data);
    }
}
