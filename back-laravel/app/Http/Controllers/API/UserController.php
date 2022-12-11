<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function createUser(Request $request) {
        $data['email'] = $request['email'];
        $data['userId'] = $request['uid'];
        User::create($data);
        return response()->json($data);
    }
}
