<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    public static $wrap = 'room';
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => 'room', // 'room' is the type of the resource
            'id' => $this->id,
            'name' => $this->name,
            'is_available' => $this->isAvailable,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'links' => [
                'self' => route('rooms.show', ['room' => $this->id]),
            ],
            'tenant_id' => $this->tenant_id,
            'rent_house_id' => $this->rent_house_id,
            // 'tenant' => $this->tenant,
            // 'rent_house' => new RentHouseResource($this->rentHouse),
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
