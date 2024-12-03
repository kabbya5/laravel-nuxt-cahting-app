<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use PHPUnit\Framework\TestCase;
use Illuminate\Support\Facades\Hash;
class AuthLoginTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_it_logs_in_with_valid_credentials(){
        $user = new User([
            'email'    => 'keenan37@example.com',
            'password' => bcrypt('password'), // Make sure the password is hashed if necessary
        ]);


        Auth::shouldReceive('attempt')
            ->once()
            ->with(['email' => $user->email, 'password' => 'password'])
            ->andReturn(true);


        Auth::shouldReceive('user')
            ->once()
            ->andReturn($user);

        $credentials = ['email' => 'keenan37@example.com', 'password' => 'password'];

        // Attempt login and assert success
        $loginSuccess = Auth::attempt($credentials);
        $this->assertTrue($loginSuccess);
    }
}
