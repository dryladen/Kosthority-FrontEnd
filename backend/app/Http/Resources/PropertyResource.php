<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'address' => $this->address,
            'image' => $this->image,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'units' => new UnitCollection($this->units),
            'links' => [
                'self' => route('property.show', ['property' => $this->id]),
            ],
        ];
    }

    public function with($request): array
    {
        return [
            'status' => 'success',
            'meta' => [
                'key' => 'value',
            ],
        ];
    }

    public function withResponse($request, $response): void
    {
        $response->header('Accept', 'application/json');
    }
}
