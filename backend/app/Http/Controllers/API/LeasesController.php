<?php

namespace App\Http\Controllers\API;

use App\Models\Leases;
use App\Http\Controllers\Controller;
use App\Http\Requests\LeasesRequest;
use App\Http\Resources\LeaseCollection;
use App\Http\Resources\LeaseResource;

class LeasesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new LeaseCollection(Leases::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(LeasesRequest $request)
    {
        try {
            $leases = Leases::create($request->validated());
            return (new LeaseResource($leases))->response()->setStatusCode(201);
        } catch (\Exception $e) {
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
            $leases = Leases::findOrFail($id);
            return (new LeasesResource($leases))->response()->setStatusCode(200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'Error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LeasesRequest $request, string $id)
    {
        try {
            $leases = Leases::findOrFail($id);
            $leases->update($request->validated());
            return (new LeasesResource($leases))->response()->setStatusCode(200);
        } catch (\Exception $e) {
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
            $leases = Leases::findOrFail($id);
            $leases->delete();
            return response()->json([
                'status' => 'Success',
                'message' => 'Leases deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'Error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
