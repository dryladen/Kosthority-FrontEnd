<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomCollection;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return new RoomCollection(Room::paginate($request->get('paginate') ?: 10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'description' => 'required|string',
                'isAvailable' => 'required|boolean',
                // 'tenant_id' => 'required|integer',
                'rent_house_id' => 'required|integer',
            ]);
            $room = Room::create($validated);
            DB::commit();
            return (new RoomResource($room))->response()->setStatusCode(201);
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
    public function show(Room $room)
    {
        try {
            $roomResource = new RoomResource($room);
            return $roomResource->response()->setStatusCode(200);
        } catch (\Exception $e) {
            // Log the exception for better debugging and monitoring
            Log::error('Error fetching room data: ' . $e->getMessage());
            return response()->json([
                'message' => 'Server Internal Error',
                'error' => env('APP_DEBUG') ? $e->getMessage() : 'An unexpected error occurred',
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'description' => 'required|string',
                'isAvailable' => 'required|boolean',
                // 'tenant_id' => 'required|integer',
                'rent_house_id' => 'required|integer',
            ]);
            $room->update($validated);
            DB::commit();
            return (new RoomResource($room))->response()->setStatusCode(200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error updating room data: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        DB::beginTransaction();
        try {
            $room->delete();
            DB::commit();
            return response()->json([
                'message' => 'Room deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error deleting room data: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
