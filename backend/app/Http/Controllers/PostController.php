<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request){
        $page = $request->input('page', 1);
        $cacheKey = 'posts_page_' . $page;
        $limit = $request->input('limit', 30);

        $posts = Cache::remember($cacheKey,20, function () use($limit) {
            return Post::with('likes','user', 'comments')->latest()->paginate($limit);
        });

        return PostResource::collection($posts);
    }
}
