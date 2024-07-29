<?php

namespace App\Models;

use App\Traits\HasTenant;
use App\Traits\ModelHelpers;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Room extends Model
{
    use HasFactory, ModelHelpers;

    const TABLE = 'rooms';
    protected $table = self::TABLE;
    protected $fillable = [
        'name',
        'description',
        'is_available',
        'rent_house_id',
    ];

    public function rentHouse()
    {
        return $this->belongsTo(RentHouse::class, 'rent_house_id');
    }

    public function tenant() : HasOne
    {
        return $this->hasOne(Tenant::class, 'room_id');
    }
}
