<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FriendShipController extends Controller
{
    public function addFriend($friendId){
        $user = Auth::user();

        if($user->id === $friendId){
            return response()->json(['message' => 'You cannot add yourself'], 400);
        }

        $existtingRequest = DB::select("
            SELECT * FROM friendships
            where(user_id = :user_id AND friend_id = :friend_id)
                OR(user_id = :friend_id AND friend_id = :user_id)
            LIMIT 1;
        ",['user_id'  => $user->id, 'friend_id' => $friendId]);

        if($existtingRequest){
            return response()->json(['message' => 'Friend request already exists or you are already friends.'], 400);
        }

        DB::statement("INSERT INTO friendships (user_id, friend_id, status)
            VALUES(?, ?, ?)", [$user->id, $friendId, 'pending']);

        return response()->json(['message' => 'Friend request sent.'], 200);
    }
}
