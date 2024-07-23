<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();
        $user = $request->user();
        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
            'token' => $token,
            'message' => 'Anda Berhasil Login'
        ]);
    }
    public function login(Request $request)
    {
        //$user = Auth::user();
        $validation = Validator::make($request->all(), [
            'email' => 'required|string|max:30',
            'password' => 'required'
        ]);
        if ($validation->fails()) {
            return response()->json($validation->errors(), 400);
        }
        try {
            $user = User::where('email', $request->email)->first();
            if (!$user) {
                return response()->json(['message' => 'Akun Anda tidak ditemukan', 'status' => 400], 400);
            } else if (!(Hash::check($request->password, $user->password))) {
                return response()->json(['message' => 'Password Anda Salah, Silahkan Input Kembali', 'status' => 400], 400);
            }
            $token = $user->createToken($request->email)->plainTextToken;
            return response()->json([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'token' => $token,
                'message' => 'Anda Berhasil Login',
                'status' => 200
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 500], 500);
        }
    }
    public function checkLogin(Request $request)
    {
        try {
            $user = $request->user();
            $response = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ];
            return response()->json(['data' => $response]);
        } catch (Exception $e) {
            return response()->json(['message' => $e, 'status' => 500], 500);
        }
    }
    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->user()->tokens()->delete();
        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
