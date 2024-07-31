<?php

namespace App\Models;

use App\Traits\ModelHelpers;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Room extends Model
{
    use HasFactory, ModelHelpers;

    const TABLE = 'units';
    protected $table = self::TABLE;
    protected $fillable = [
        'name',
        'price',
        'description',
        'property_id',
    ];

    public function property()
    {
        return $this->belongsTo(RentHouse::class, 'property_id');
    }

    public function tenant() : HasOne
    {
        return $this->hasOne(Tenant::class, 'unit_id');
    }
}
