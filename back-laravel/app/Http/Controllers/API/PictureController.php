<?php

namespace App\Http\Controllers\API;

use App\Models\Picture;
use App\Models\User;
use App\Models\Tag;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PictureController extends Controller
{
    public function uploadImage(Request $request, $uid) {
        // post時にはデータは格納されているぽい→Laravelで上手くキャッチできていない
        $data = $request->all();
        // hasFileでkey(image)を含むファイルがあるか確認
        if ($request->hasFile('image')) {
            // アップロードされたファイルを取得
            $image         = $request->file('image');
            $filename      = $image->getClientOriginalName();
            $pictureName   = date('Y-H/i/s').'-'.$filename;
            // storage/app/public/img に保存される
            $image->storeAs('public/img/', $filename);

            // picturesテーブルにファイル情報を保存
            Picture::create([
                'name' => $pictureName,
                'path' => asset('storage/img/'.$filename),
                'uid' => $uid,
                'user_id' => User::where("uid", $uid)->value('id')
            ]);

            return response()->json([
                "message" => "Image Uploaded Succesfully",
                "picture_id" => Picture::where('name', $pictureName)->value('id'),
            ]);
        } else {
            return response()->json([
                "message" => "Not Found image File",
            ]);
        }
    }

    public function uploadTags(Request $request, $uid) {
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
        if(!(empty($request->tags))) {
            // 必要な写真データを１階層の配列に格納したい
            $data = [];
            foreach($request->tags as $id) {
                $pictures = Tag::find($id)->pictures;
                foreach($pictures as $picture) {
                    array_push($data, $picture);
                }
            }
            return response()->json($data);
        }
    }

    public function getUserPictures($uid) {
        // リレーションするキーを初期設定のid→user_idにすれば一行ですむかも？
        $user_id = User::where('uid', $uid)->value('id');
        $data = User::find($user_id)->pictures;
        return response()->json($data);
    }

    public function getUserPicture($uid, $id) {
        $data = Picture::find($id);
        return response()->json($data);
    }

    public function deleteUserPicture($uid, $id) {
        $data = Picture::where('uid', $uid)->find($id);
        $data->delete();
        $filename = $data['name'];
        Storage::disk('public')->delete("img/".$filename);
        return response()->json([$id, $data, $filename]);
    }

}
