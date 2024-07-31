<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Property;
use App\Models\Tenant;
use App\Models\Unit;
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
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('password')
            ]);
            Property::factory()->has(Unit::factory(3),'units')->create(['owner_id' => 1]);
            Property::factory()->has(Unit::factory(3),'units')->create(['owner_id' => 2]);
            Tenant::factory(5)->create();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            echo $e->getMessage();
        }
    }
}
