<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => fake()->name(),
            'email' => 'user_a@zisprink.com',
            'email_verified_at' => now(),
            'password' => Hash::make(123456789),
            'profile_picture' => 'https://picsum.photos/200/200',
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => fake()->name(),
            'email' => 'user1@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make(123456789),
            'profile_picture' => 'https://picsum.photos/200/200',
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => fake()->name(),
            'email' =>  'user2@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make(123456789),
            'profile_picture' => 'https://picsum.photos/200/200',
            'remember_token' => Str::random(10),
        ]);
        User::factory(10)->create(); // Generate 10 users
    }
}
