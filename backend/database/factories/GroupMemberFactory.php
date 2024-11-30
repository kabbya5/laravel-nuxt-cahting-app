<?php

namespace Database\Factories;

use App\Models\GroupMember;
use App\Models\User;
use App\Models\Group;
use Illuminate\Database\Eloquent\Factories\Factory;

class GroupMemberFactory extends Factory
{
    protected $model = GroupMember::class;

    public function definition()
    {
        return [
            'group_id' => Group::factory(),
            'user_id' => User::factory(),
            'role' => $this->faker->randomElement(['admin', 'member']),
        ];
    }
}
