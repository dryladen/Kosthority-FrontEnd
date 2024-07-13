<?php

namespace App\Http\Resources;

use App\Models\RentHouse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => 'user', // 'user' is the type of the resource
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'links' => [
                'self' => route('users.show', ['user' => $this->id]),
            ],
            'rent_houses' => [
                'total' => RentHouse::where('owner_id', $this->id)->count(),
                'list' => $this->rentHouse->pluck('name'),
            ],
        ];
    }

    public function with($request): array
    {
        return [
            'status' => 'success',
        ];
    }

    public function withResponse($request, $response): void
    {
        $response->header('Accept', 'application/json');
    }
}
