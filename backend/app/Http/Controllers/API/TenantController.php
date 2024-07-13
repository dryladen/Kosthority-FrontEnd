<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\TenantCollection;
use App\Http\Resources\TenantResource;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TenantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return TenantCollection::make(Tenant::paginate($request->get('paginate') ?: 10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                // 'email' => 'required|email',
                // 'phone' => 'required|string',
                'price' => 'required|integer',
                'start_date' => 'required|date',
                // 'end_date' => 'date',
                'image' => 'required|string', // 'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048
                'room_id' => 'required|integer',
            ]);
            $tenant = Tenant::create($validated);
            return (new TenantResource($tenant))->response()->setStatusCode(201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Tenant $tenant)
    {
        try {
            $roomResource = new TenantResource($tenant);
            return $roomResource->response()->setStatusCode(200);
        } catch (\Exception $e) {
            // Log the exception for better debugging and monitoring
            Log::error('Error fetching tenant data: ' . $e->getMessage());
            return response()->json([
                'message' => 'Server Internal Error',
                'error' => env('APP_DEBUG') ? $e->getMessage() : 'An unexpected error occurred',
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tenant $tenant)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                // 'email' => 'required|email',
                // 'phone' => 'required|string',
                'price' => 'required|integer',
                'start_date' => 'required|date',
                // 'end_date' => 'date',
                // 'image' => 'string', // 'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048
                'room_id' => 'required|integer',
            ]);
            $tenant->update($validated);
            return (new TenantResource($tenant))->response()->setStatusCode(200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tenant $tenant)
    {
        DB::beginTransaction();
        try {
            $tenant->delete();
            DB::commit();
            return response()->json([
                'message' => 'Tenant deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error deleting tenant: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
