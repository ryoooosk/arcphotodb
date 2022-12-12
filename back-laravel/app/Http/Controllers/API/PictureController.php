<?php

namespace App\Http\Controllers\API;

use App\Models\Picture;
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
                'userId' => $uid
            ]);

            return response()->json(["message" => "Image Uploaded Succesfully"]);
        } else {
            return response()->json(["message" => "Not Found image File", $request]);
        }
    }

    public function getUserPictures($uid) {
        $data = Picture::where('userId', $uid)->get();
        return response()->json($data);
    }

    public function getUserPicture($uid, $id) {
        $data = Picture::where('userId', $uid)->find($id);
        return response()->json($data);
    }

    public function deleteUserPicture($uid, $id) {
        $data = Picture::where('userId', $uid)->find($id);
        $data->delete();
        $filename = $data['name'];
        Storage::disk('public')->delete("img/".$filename);
        return response()->json([$id, $data, $filename]);
    }

}
