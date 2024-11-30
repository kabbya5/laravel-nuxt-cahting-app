<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UserSeeder::class,
            GroupSeeder::class,
            MessageSeeder::class,
            GroupMemberSeeder::class,
            CallSeeder::class,
        ]);
    }
}
