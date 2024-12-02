<?php

namespace Database\Factories;

use App\Models\Message;
use App\Models\User;
use App\Models\Group;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    protected $model = Message::class;

    public function definition()
    {
        return [
            'sender_id' => User::factory(),
            'receiver_id' => User::factory(),
            'group_id' => Group::factory(),
            'content' => $this->faker->sentence(),
            'message_type' => 'text',
            'is_read'  => $this->faker->boolean,
        ];
    }
}

