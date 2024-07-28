<?php

namespace App\Models;

use App\Traits\ModelHelpers;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RentHouse extends Model
{
    use HasFactory, ModelHelpers;

    const TABLE = 'rent_houses';
    protected $table = self::TABLE;
    protected $fillable = [
        'name',
        'address',
        'description',
        'image',
        'price',
        'owner_id',
    ];

    public function owner() : BelongsTo
    {
        return $this->belongsTo(User::class,'owner_id');
    }
    public function rooms() : HasMany
    {
        return $this->hasMany(Room::class,'rent_house_id');
    }
}
