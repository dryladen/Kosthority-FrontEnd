<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TenantResource extends JsonResource
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
            'email' => $this->email,
            'phone' => $this->phone,
            'image' => $this->image,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'links' => [
                'self' => route('tenants.show', ['tenant' => $this->id]),
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
