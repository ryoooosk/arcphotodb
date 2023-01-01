<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\PictureController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('user')->group(function() {
    Route::post('/create', [UserController::class, 'createUser']);
});

Route::prefix('image')->group(function() {
    Route::post('/{uid}/store', [PictureController::class, 'uploadImage']);
    Route::post('/{uid}/store/tags', [PictureController::class, 'setTagsPicture']);
    Route::post('/{uid}/favorite/set', [PictureController::class, 'setUserFavorite']);
    Route::post('/{uid}/favorite/remove', [PictureController::class, 'removeUserFavorite']);
    Route::get('/{uid}/userpicture/all', [PictureController::class, 'getUserPictures']);
    Route::get('/{uid}/favorite/all', [PictureController::class, 'getUserFavorites']);
    Route::get('/userpicture/{id}', [PictureController::class, 'getUserPicture']);
    Route::delete('/{uid}/userpicture/{id}/delete', [PictureController::class, 'deleteUserPicture']);
    Route::post('/get/tags', [PictureController::class, 'getTagPictures']);
});
