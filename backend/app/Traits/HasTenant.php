<?php

namespace App\Traits;

use App\Models\Tenant;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait HasTenant
{
  public function tenant(): Tenant
  {
    return $this->tenantRelation;
  }

  public function tenantRelation() : BelongsTo  {
    return $this->belongsTo(Tenant::class, 'tenant_id');
  }

  public function isTenantBy(Tenant $tenant): bool
  {
    return $this->tenant()->matches($tenant);
  }

  public function tenantBy(Tenant $tenant)
  {
    return $this->tenantRelation()->associate($tenant);
  }
}
