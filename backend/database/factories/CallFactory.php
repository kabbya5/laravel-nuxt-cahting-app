<?php

namespace Database\Factories;

use App\Models\Call;
use App\Models\User;
use App\Models\Group;
use Illuminate\Database\Eloquent\Factories\Factory;

class CallFactory extends Factory
{
    protected $model = Call::class;

    public function definition()
    {
        return [
            'caller_id' => User::factory(),
            'receiver_id' => User::factory(),
            'group_id' => Group::factory(),
            'call_type' => $this->faker->randomElement(['audio', 'video']),
            'status' => 'ended',
            'started_at' => now(),
            'ended_at' => now()->addMinutes(rand(5, 30)),
        ];
    }
}

