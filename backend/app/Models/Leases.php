<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leases extends Model
{
    use HasFactory;

    const TABLE = 'leases';

    protected $table = self::TABLE;

    protected $fillable = [
        'tenant_id',
        'unit_id',
        'start_date',
        'end_date',
        'price',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class, 'tenant_id');
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class, 'unit_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'lease_id');
    }
}
