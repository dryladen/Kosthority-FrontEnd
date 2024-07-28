<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TenantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'price' => 'required|integer',
            'start_date' => 'required|date',
            'end_date' => 'nullable | date',
            'image' => 'required|string', // 'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048
            'room_id' => 'required|integer',
        ];
    }
}
