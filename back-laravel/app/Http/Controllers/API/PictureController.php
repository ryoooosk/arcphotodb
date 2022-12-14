<?php

namespace App\Http\Controllers\API;

use App\Models\Picture;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PictureController extends Controller
{
    public function uploadImage(Request $request, $uid) {
        // hasFileでkeyを含むファイルがあるか確認
        if ($request->hasFile('image')) {
            // アップロードされたファイルを取得
            $image      = $request->file('image');
            $filename  = $image->getClientOriginalName();
            // $pictureName   = date('His').'-'.$filename;
            // storage/app/public/img に保存される
            $image->storeAs('public/img/', $filename);

            // DBにファイル情報を保存
            Picture::create([
                'name' => $filename,
                'path' => asset('storage/img/'.$filename),
                'uid' => $uid,
                'user_id' => User::where("uid", $uid)->value('id')
            ]);

            return response()->json(["message" => "Image Uploaded Succesfully"]);
        } else {
            return response()->json(["message" => "Not Found image File", $request]);
        }
    }

    public function getUserPictures($uid) {
        // リレーションを使ってUserモデルからPicture配列を引き出したい
        // User::find()->picturesだとフロント側で[object Object]となってしまう

        // $user_id = User::where('uid', $uid)->value('id');
        $user_id = User::where('uid', $uid)->value('id');
        // $data = User::find($user_id)->pictures()->get();
        $data = Picture::where('user_id', $user_id)->get();
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
