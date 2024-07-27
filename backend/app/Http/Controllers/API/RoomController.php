<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomRequest;
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
        return new RoomCollection(Room::latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoomRequest $request)
    {
        try {
            $room = Room::create($request->validated());
            return (new RoomResource($room))->response()->setStatusCode(201);
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
    public function show(string $id)
    {
        try {
            $room = Room::findOrFail($id);
            return (new RoomResource($room))->response()->setStatusCode(200);
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
    public function update(RoomRequest $request, string $id)
    {
        try {
            $room->update($request->validated());
            return (new RoomResource($room))->response()->setStatusCode(200);
        } catch (\Exception $e) {
            Log::error('Error updating data: ' . $e->getMessage());
            return response()->json([
                'status' => 'Error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $room = Room::findOrFail($id);
            $room->delete();
            return response()->json([
                'status' => 'Success',
                'message' => 'Room deleted successfully',
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
