<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait HasOwner
{
  public function owner(): User
  {
    return $this->ownerRelation;
  }

  public function ownerRelation() : BelongsTo
  {
    return $this->belongsTo(User::class, 'owner_id');
  }

  public function isOwnerdBy(User $owner): bool
  {
    return $this->owner()->matches($owner);
  }

  public function owneredBy(User $owner)
  {
    return $this->ownerRelation()->associate($owner);
  }
}