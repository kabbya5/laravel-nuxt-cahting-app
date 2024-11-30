<?php

namespace Database\Seeders;

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Call;

class CallSeeder extends Seeder
{
    public function run()
    {
        Call::factory(20)->create(); // Generate 20 calls
    }
}

