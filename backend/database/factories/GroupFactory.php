<?php

namespace Database\Factories;

use App\Models\Group;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class GroupFactory extends Factory
{
    protected $model = Group::class;

    public function definition()
    {
        return [
            'name' => $this->faker->words(2, true), // Generate a random group name
            'group_picture' => $this->faker->imageUrl(200, 200, 'groups', true, 'Group'), // Fake image URL
            'owner_id' => User::factory(),
        ];

    }
}
