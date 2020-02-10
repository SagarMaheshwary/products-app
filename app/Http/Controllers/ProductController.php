<?php

namespace App\Http\Controllers;

use Storage;
use App\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    /**
     * Retrieve all the products with pagination
     * links.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $products = Product::orderBy('created_at', 'desc')->paginate();

        return response()->json([
            'products' => $products,
        ]);
    }

    /**
     * Store a product to the database.
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|min:2|max:50|unique:products',
            'description' => 'required|min:10|max:10000',
            'price'       => 'required|numeric|min:1',
            'quantity'    => 'required|integer|min:1',
            'image'       => 'required|image|mimes:png,jpeg,jpg',
        ]);

        $product = new Product();
        $product->name = $request->name;
        $product->slug = Str::slug($request->name, '-');
        $product->description = $request->description;
        $product->price = $request->price;
        $product->quantity = $request->quantity;
        $product->image = $this->uploadProductImage($request->image);
        $product->save();

        return response()->json([
            'product' => $product,
            'msg'     => 'New product has been created!',
        ], 201);
    }

    /**
     * Retrieve the specified product.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id)
    {
        $product = Product::findOrFail($id);

        return response()->json([
            'product' => $product,
        ]);
    }

    /**
     * Update the specified product from the database.
     * 
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        //ignore the current id for unique check
        //when updating a product.
        $request->validate([
            'name'        => [
                'required',
                'min:2',
                'max:50',
                Rule::unique('products')->ignore($id),
            ],
            'description' => 'required|min:10|max:10000',
            'price'       => 'required|numeric|min:1',
            'quantity'    => 'required|integer|min:1',
            'image'       => 'nullable|image|mimes:png,jpeg,jpg',
        ]);

        $product = Product::findOrFail($id);
        $product->name = $request->name;
        $product->slug = Str::slug($request->name, '-');
        $product->description = $request->description;
        $product->price = $request->price;
        $product->quantity = $request->quantity;

        if ($request->hasFile('image')) {
            //delete the previous image before uploading a new one.
            Storage::delete("public/products/{$product->image}");
            $product->image = $this->uploadProductImage($request->image);
        }

        $product->save();

        return response()->json([
            'product' => $product,
            'msg'     => 'Selected product has been updated!',
        ]);
    }

    /**
     * Delete the specified product from the database.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'msg' => 'Selected product has been deleted!',
        ]);
    }

    /**
     * Upload product image to the laravel storage.
     * 
     * @param \Illuminate\Http\UploadedFile $image
     * @return string
     */
    private function uploadProductImage($image)
    {
        //generate a random string from laravel's helper class.
        $randomStr = Str::random(16);
        $extension = $image->extension();
        $fileName = "{$randomStr}.{$extension}";

        //store file to the storage/public/products directory.
        $image->storeAs('public/products', $fileName);

        return $fileName;
    }
}
