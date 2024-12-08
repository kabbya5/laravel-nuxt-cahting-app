<?php

namespace Database\Factories;

use App\Models\Page;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title =  rtrim($this->faker->sentence(rand(5, 8)), '.');
        return [
            'user_id' => \App\Models\User::factory(),
            'page_id' => $this->faker->randomElement([Page::inRandomOrder()->first()->id, null]),
            'title' => $title,
            'img_url' => $this->faker->imageUrl(),
            'video_url' => $this->faker->url,
            'type' => $this->faker->randomElement(['video', 'image', 'text']),
            'status' => $this->faker->randomElement(['only_me', 'published', 'friend']),
            'slug' => str_slug($title),
            'content' => $this->faker->paragraphs(rand(6, 15), true)
        ];
    }
}
