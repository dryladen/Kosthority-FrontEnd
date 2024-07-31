<?php

namespace Database\Factories;

use App\Models\RentHouse;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class UnitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'description' => fake()->sentence(),
            'price' => fake()->numberBetween(1000, 9000),
            'property_id' => $attributes['property_id'] ?? RentHouse::factory()->create(['owner_id' => 1]),
        ];
    }
}
