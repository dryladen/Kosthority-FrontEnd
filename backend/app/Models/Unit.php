<?php

namespace App\Models;

use App\Traits\ModelHelpers;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Unit extends Model
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
        return $this->belongsTo(Property::class, 'property_id');
    }

    public function leases() : HasOne
    {
        return $this->hasOne(Leases::class, 'unit_id');
    }
}
