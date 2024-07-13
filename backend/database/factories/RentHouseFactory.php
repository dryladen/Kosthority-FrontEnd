<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RentHouse>
 */
class RentHouseFactory extends Factory
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
            'address' => fake()->address(),
            'description' => fake()->sentence(),
            'image' => fake()->imageUrl(),
            'price' => fake()->randomFloat(2, 100, 1000),
            'owner_id' => $attributes['owner_id'] ?? User::factory(),
        ];
    }
}
