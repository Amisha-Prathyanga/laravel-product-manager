<?php
   
namespace App\Http\Controllers\API;
   
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Product;
use Validator;
use App\Http\Resources\ProductResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
   
class ProductController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): JsonResponse
    {
        //$products = Product::all();

        // Set the default number of items per page
        $perPage = $request->query('per_page', 8); // Default to 10 items per page

        // Get paginated products
        $products = Product::paginate($perPage);
    
        // return $this->sendResponse(ProductResource::collection($products), 'Products retrieved successfully.');
        // Create the resource collection
        $productResources = ProductResource::collection($products);

        // Return the response with pagination data
        return response()->json([
            'data' => $productResources,
            'meta' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ],
        ], 200);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): JsonResponse
    {
        $input = $request->all();
   
        $validator = Validator::make($input, [
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            //$image->storeAs('public/products', $imageName);
            $image->storeAs('products', $imageName, 'public');
            $input['image'] = $imageName;
        }
   
        $product = Product::create($input);
   
        return $this->sendResponse(new ProductResource($product), 'Product created successfully.');
    } 
   
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id): JsonResponse
    {
        $product = Product::find($id);
  
        if (is_null($product)) {
            return $this->sendError('Product not found.');
        }
   
        return $this->sendResponse(new ProductResource($product), 'Product retrieved successfully.');
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product): JsonResponse
    {
        $input = $request->all();
   
        $validator = Validator::make($input, [
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240'
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   
        $product->name = $input['name'];
        $product->price = $input['price'];
        $product->description = $input['description'];

        if ($request->hasFile('image')) {
            // Delete old image
            if ($product->image) {
                Storage::disk('public')->delete('products/' . $product->image);
            }

            // Upload new image
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('products', $imageName, 'public');
            $product->image = $imageName;
        }

        $product->save();
   
        return $this->sendResponse(new ProductResource($product), 'Product updated successfully.');
    }
   
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product): JsonResponse
    {
        if ($product->image) {
            Storage::delete('public/products/' . $product->image);
        }

        $product->delete();
   
        return $this->sendResponse([], 'Product deleted successfully.');
    }
}