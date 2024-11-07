<?php

namespace App\Http\Controllers\Auth;

use App\Events\UserSessionChanged;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'min:2'],
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->error()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('authentication')->plainTextToken;

        return response()->json([
            'message' => 'User registred successfully',
            'user' => $user,
            'token'  => $token,
        ]);

    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        $credentials = $request->only('email', 'password');
        if (auth()->attempt($credentials)) {
            $user = auth()->user();
            return response()->json(['user' => $user, 'token' => $user->createToken('authentication')->plainTextToken]);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function logout(Request $request)
    {
        $user = $request->user();


        $user->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}