<?php

namespace App\Http\Controllers\API;

use App\Models\Picture;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PictureController extends Controller
{
    public function uploadImage(Request $request) {
        // // ディレクトリ名
        // $dir = 'image';
        // // sampleディレクトリに画像を保存
        // $fileName = $request->name;
        // $request->file('image')->store("public/{$dir}");

        if ($request->hasFile('image')) {
            $file      = $request->file('image');
            $filename  = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $picture   = date('His').'-'.$filename;
            //move image to public/img folder
            $file->move(public_path('img'), $picture);
            return response()->json(["message" => "Image Uploaded Succesfully"]);
        } else {
            return response()->json(["message" => "Select image first."]);
        }
    }
}
