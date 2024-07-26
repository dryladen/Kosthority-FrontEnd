<?php

namespace App\Models;

use App\Traits\ModelHelpers;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
    public function rooms()
    {
        return $this->hasMany(Room::class);
    }
}
