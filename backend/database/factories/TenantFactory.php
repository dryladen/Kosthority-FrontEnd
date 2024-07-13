<?php

namespace Database\Factories;

use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tenant>
 */
class TenantFactory extends Factory
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
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'price' => fake()->randomFloat(2, 100, 1000),
            'start_date' => fake()->dateTimeBetween('-1 years', 'now'),
            'end_date' => fake()->dateTimeBetween('now', '+1 years'),
            'image' => fake()->imageUrl(),
            'room_id' => $attributes['room_id'] ?? Room::factory(),
        ];
    }
}
