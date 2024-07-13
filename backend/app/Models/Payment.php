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
        'paid_amount',
        'unpaid_amount',
        'payment_method',
        'date',
        'description',
        'status',
        'tenant_id',
        'room_id',
        'rent_house_id',
    ];
}
