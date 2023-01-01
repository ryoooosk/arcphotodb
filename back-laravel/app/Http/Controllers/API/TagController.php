<?php

namespace App\Http\Controllers\API;

use App\Models\Picture;
use App\Models\Tag;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function setTagsPicture(Request $request) {
        if(is_array($request->tags)) {
            $id = $request->picture_id;
            // ↓写真に登録済みのタグ情報を一度削除
            Picture::find($id)->tags()->detach();
            // ↓改めてタグ登録する attach()→完全重複を含め、すべてのデータが中間テーブルに保存
            Picture::find($id)->tags()->attach($request->tags);

            return response()->json([
                "message" => "Success Tags Upload",
            ]);
        } else {
            return response()->json([
                "message" => "Not Fount Tags",
            ]);
        }
    }

    public function getTagPictures(Request $request) {
        $tags = $request->all();
        if(!(empty($tags))) {
            // 必要な写真データを１階層の配列に格納したい
            $data = [];
            foreach($tags as $id) {
                $pictures = Tag::find($id)->tagpictures;
                foreach($pictures as $picture) {
                    array_push($data, $picture);
                }
            }
            return response()->json($data);
        }
    }
}
