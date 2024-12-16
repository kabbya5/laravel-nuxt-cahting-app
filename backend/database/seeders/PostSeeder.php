<?php

namespace Database\Seeders;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Post::factory(100)->create()->each(function($post){
            $likes = rand(0, 200);
            Like::factory($likes)->create([
                'likeable_id' => $post->id,
                'likeable_type' => Post::class,
            ]);
        });
    }
}
