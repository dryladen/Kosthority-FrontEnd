<?php

namespace App\Models;

use App\Traits\ModelHelpers;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Property extends Model
{
    use HasFactory, ModelHelpers;

    const TABLE = 'properties';
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
    public function units() : HasMany
    {
        return $this->hasMany(Unit::class,'property_id');
    }
}
