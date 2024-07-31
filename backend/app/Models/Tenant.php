<?php

namespace App\Models;

use App\Traits\ModelHelpers;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    use HasFactory, ModelHelpers;

    const TABLE = 'tenants';
    protected $table = self::TABLE;
    protected $fillable = [
        'name',
        'email',
        'phone',
        'price',
        'start_date',
        'end_date',
        'image',
        'room_id',
    ];

    public function leases()
    {
        return $this->hasMany(Lease::class, 'tenant_id');
    }
}
