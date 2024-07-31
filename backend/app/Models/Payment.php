<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    const TABLE = 'payments';
    protected $table = self::TABLE;
    protected $fillable = [
        'lease_id',
        'amount',
        'paid',
        'balance',
        'method',
        'status'
    ];

    public function lease()
    {
        return $this->belongsTo(Lease::class, 'lease_id');
    }
}
