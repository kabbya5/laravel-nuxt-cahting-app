<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index(Request $request){
        $page = $request->input('page', 1);
        $cacheKey = 'posts_page_' . $page;
        $limit = $request->input('limit', 30);

        $posts = Cache::remember($cacheKey,2, function () use($limit) {
            return Post::with('likes.user','user', 'comments')->latest()->paginate($limit);
        });

        return PostResource::collection($posts);
    }

    public function likePost(Request $request, Post $post){
        $user = auth()->user();
        $alReadyLiked = $post->likes()->where('user_id', $user->id)->exists();

        if($alReadyLiked){
            $post->likes()->where('user_id', $user->id)->delete();
        }else{
            $post->likes()->create([
                'user_id' => $user->id,
            ]);
        }

        return true;
    }
}
