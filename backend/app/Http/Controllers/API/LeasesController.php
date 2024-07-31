<?php

namespace App\Http\Controllers\API;

use App\Models\Leases;
use App\Http\Requests\StoreLeasesRequest;
use App\Http\Requests\UpdateLeasesRequest;
use App\Http\Controllers\Controller;

class LeasesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLeasesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Leases $leases)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Leases $leases)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLeasesRequest $request, Leases $leases)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Leases $leases)
    {
        //
    }
}
