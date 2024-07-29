<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\RentHouse;
use App\Models\Room;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::beginTransaction();
        try {
            User::factory()->create([
                'name' => 'Laden',
                'email' => 'laden@gmail.com',
                'password' => bcrypt('password')
            ]);
            User::factory()->create([
                'name' => 'John Doe',
                'email' => 'johndoe@gmail.com',
                'password' => bcrypt('password')
            ]);
            RentHouse::factory()->has(Room::factory(3)->has(Tenant::factory(), 'tenant'), 'rooms')->create(['owner_id' => 1]);
            RentHouse::factory()->has(Room::factory(3)->has(Tenant::factory(), 'tenant'), 'rooms')->create(['owner_id' => 2]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            echo $e->getMessage();
        }
    }
}
