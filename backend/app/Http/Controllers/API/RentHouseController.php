<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
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
    public function index(Request $request)
    {
        return new RentHouseCollection(Auth::user()->rentHouse()->latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'address' => 'required|string',
                'description' => 'required|string',
                'image' => 'required|string',
                'price' => 'required|integer',
                'owner_id' => 'required|integer',
            ]);
            DB::beginTransaction();
            $rentHouse = RentHouse::create($validated);
            DB::commit();
            return (new RentHouseResource($rentHouse))->response()->setStatusCode(201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(RentHouse $renthouse)
    {
        DB::beginTransaction();
        try {
            $data = new RentHouseResource($renthouse);
            DB::commit();
            return $data->response()->setStatusCode(200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Server Internal Error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RentHouse $renthouse)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'address' => 'required|string',
                'description' => 'required|string',
                'image' => 'required|string',
                'price' => 'required|integer',
                'owner_id' => 'required|integer',
            ]);
            DB::beginTransaction();
            $renthouse->update($validated);
            DB::commit();
            return (new RentHouseResource($renthouse))->response()->setStatusCode(200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RentHouse $renthouse)
    {
        DB::beginTransaction();
        try {
            $renthouse->delete();
            DB::commit();
            return response()->json([
                'message' => 'Delete Success',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Server Internal Error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
