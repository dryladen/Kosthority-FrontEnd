<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
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
            'owner_id' => fake()->numberBetween(1, 2),
        ];
    }
}
