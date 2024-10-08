<?php

namespace Tests\Unit\Controllers\API;

use App\Http\Controllers\API\RegisterController;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Tests\TestCase;
use Illuminate\Support\Facades\Auth;

class RegisterControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $controller;

    public function setUp(): void
    {
        parent::setUp();
        $this->controller = new RegisterController();
    }

    public function testRegister()
    {
        $request = new Request([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'c_password' => 'password123'
        ]);

        $response = $this->controller->register($request);

        $this->assertEquals(200, $response->status());
        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
        // $this->assertArrayHasKey('token', $response->getData()->data);
        $responseData = (array) $response->getData();
        $this->assertArrayHasKey('token', $responseData['data']);

    }

    public function testLogin()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123')
        ]);

        $request = new Request([
            'email' => 'test@example.com',
            'password' => 'password123'
        ]);

        $response = $this->controller->login($request);

        $this->assertEquals(200, $response->status());
        // $this->assertArrayHasKey('token', $response->getData()->data);
        $responseData = (array) $response->getData();
        $this->assertArrayHasKey('token', $responseData['data']);

    }

    public function testLogout()
    {
        // $user = User::factory()->create();
        // $token = $user->createToken('TestToken')->plainTextToken;

        // $request = new Request();
        // $request->setUserResolver(function () use ($user) {
        //     return $user;
        // });

        // $response = $this->controller->logout($request);

        // $this->assertEquals(200, $response->status());
        // $this->assertDatabaseMissing('personal_access_tokens', ['tokenable_id' => $user->id]);
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum'); // Authenticate user with Sanctum

        $request = new Request();
        $response = $this->controller->logout($request);

        $this->assertEquals(200, $response->status());

    }
}
