<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RentHouseRequest;
use App\Http\Resources\RentHouseCollection;
use App\Http\Resources\RentHouseResource;
use App\Models\RentHouse;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RentHouseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new RentHouseCollection(Auth::user()->rentHouse()->latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RentHouseRequest $request)
    {
        try {
            $rentHouse = RentHouse::create($request->validated());
            return (new RentHouseResource($rentHouse))->response()->setStatusCode(201);
        } catch (\Exception $e) {
            Log::error('Error creating data: ' . $e->getMessage());
            return response()->json([
                'status' => 'Error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(RentHouseRequest $renthouse)
    {
        try {
            return (new RentHouseResource($renthouse))->response()->setStatusCode(200);
        } catch (\Exception $e) {
            Log::error('Error fetching data: ' . $e->getMessage());
            return response()->json([
                'status' => 'Error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RentHouseRequest $request, string $id)
    {
        try {
            $renthouse = RentHouse::findOrFail($id);
            $renthouse->update($request->validated());
            return (new RentHouseResource($renthouse))->response()->setStatusCode(200);
        } catch (\Exception $e) {
            Log::error('Error editing data: ' . $e->getMessage());
            return response()->json([
                'status' => 'Error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string  $id)
    {
        try {
            $renthouse = RentHouse::findOrFail($id);
            $renthouse->delete();
            return response()->json([
                'status' => 'Success',
                'message' => 'Data deleted successfuly',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error deleting data: ' . $e->getMessage());
            return response()->json([
                'status' => 'Error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
