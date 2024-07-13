<?php

namespace Database\Seeders;

use App\Models\RentHouse;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RentHouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RentHouse::factory(3)->create(['owner_id' => 1]);
        RentHouse::factory(3)->create(['owner_id' => 2]);
    }
}
