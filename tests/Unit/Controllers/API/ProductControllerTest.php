<?php

namespace Tests\Unit\Controllers\API;

use App\Http\Controllers\API\ProductController;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ProductControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $controller;

    public function setUp(): void
    {
        parent::setUp();
        $this->controller = new ProductController();
    }

    public function testIndex()
    {
        Product::factory()->count(15)->create();

        $request = new Request(['per_page' => 8]);
        $response = $this->controller->index($request);

        $this->assertEquals(200, $response->status());
        $this->assertCount(8, $response->getData()->data);
        $this->assertEquals(15, $response->getData()->meta->total);
    }

    public function testStore()
    {
        Storage::fake('public');

        $request = new Request([
            'name' => 'Test Product',
            'price' => 19.99,
            'description' => 'Test Description',
            'image' => UploadedFile::fake()->image('product.jpg')
        ]);

        $response = $this->controller->store($request);

        $this->assertEquals(200, $response->status());
        $this->assertDatabaseHas('products', ['name' => 'Test Product']);
        Storage::disk('public')->assertExists('products/' . $response->getData()->data->image);
    }

    public function testShow()
    {
        $product = Product::factory()->create();

        $response = $this->controller->show($product->id);

        $this->assertEquals(200, $response->status());
        $this->assertEquals($product->name, $response->getData()->data->name);
    }

    public function testUpdate()
    {
        Storage::fake('public');

        $product = Product::factory()->create();
        $oldImage = $product->image;

        $request = new Request([
            'name' => 'Updated Product',
            'price' => 29.99,
            'description' => 'Updated Description',
            'image' => UploadedFile::fake()->image('new_product.jpg')
        ]);

        $response = $this->controller->update($request, $product);

        $this->assertEquals(200, $response->status());
        $this->assertDatabaseHas('products', ['name' => 'Updated Product']);
        Storage::disk('public')->assertExists('products/' . $response->getData()->data->image);
        Storage::disk('public')->assertMissing('products/' . $oldImage);
    }

    public function testDestroy()
    {
        Storage::fake('public');

        $product = Product::factory()->create(['image' => 'test.jpg']);
        Storage::disk('public')->put('products/test.jpg', 'dummy content');

        $response = $this->controller->destroy($product);

        $this->assertEquals(200, $response->status());
        $this->assertDatabaseMissing('products', ['id' => $product->id]);
        Storage::disk('public')->assertMissing('products/test.jpg');
    }
}