<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    public function sendMessage(Request $request){
        $request->validate([
            'receiver_id' => 'required|exists:users.id',
            'message' => 'required|string',
        ]);

        $message = chat::create($request->all());

        return response()->json($message);
    }

    public function messages($friendId)
    {
        $messages = Chat::where(function($query) use ($friendId) {
            $query->where('sender_id', auth()->id())
                  ->where('receiver_id', $friendId);
        })->orWhere(function($query) use ($friendId) {
            $query->where('sender_id', $friendId)
                  ->where('receiver_id', auth()->id());
        })->get();

        return response()->json($messages);
    }


}
