<?php

namespace App\Http\Controllers\API;

use App\Models\Picture;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PictureController extends Controller
{
    public function getAllPictures() {
        $data = Picture::all();
        return response()->json($data);
    }

    public function uploadImage(Request $request, $uid) {
        // hasFileでkey(image)を含むファイルがあるか確認
        if ($request->hasFile('image')) {
            // アップロードされたファイルを取得
            $image         = $request->file('image');
            $filename      = $image->getClientOriginalName();
            $pictureName   = date('Y-H/i/s').'-'.$filename;
            // storage/app/public/img に保存される
            $image->storeAs('public/img/', $filename);
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

    public function getUserPictures($uid) {
        // リレーションするキーを初期設定のid→user_idにすれば一行ですむかも？
        $user_id = User::where('uid', $uid)->value('id');
        $data = User::find($user_id)->pictures;
        return response()->json($data);
    }

    public function getUserPicture($id) {
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
