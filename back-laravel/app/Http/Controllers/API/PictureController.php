<?php

namespace App\Http\Controllers\API;

use App\Models\Picture;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PictureController extends Controller
{
    public function uploadImage(Request $request, $uid) {
        // hasFileでkeyを含むファイルがあるか確認
        if ($request->hasFile('image')) {
            // アップロードされたファイルを取得
            $image      = $request->file('image');
            $filename  = $image->getClientOriginalName();
            $pictureName   = date('His').'-'.$filename;
            $pass = '';
            //move image to public/img folder
            // $file->move(public_path('img'), $picture);

            // storage/app/public/img に保存される
            $pass = $image->storeAs('public/img/', $pictureName);

            // DBにファイル情報を保存
            Picture::create([
                'name' => $pictureName,
                'path' => asset('storage/img/'.$pictureName),
                'userId' => $uid
            ]);

            return response()->json(["message" => "Image Uploaded Succesfully"]);
        } else {
            return response()->json(["message" => "Not Found image File", $request]);
        }
    }

    public function getUserPhoto($uid) {
        $data = Picture::where('userId', $uid)->get();
        return response()->json($data);
    }

}
