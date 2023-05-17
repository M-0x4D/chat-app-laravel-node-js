<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    function sign_in(Request $request)
    {
        
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json([
                'status' => 422,
                'message' => __(''),
            ], 422);
        }
 
        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException ::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
     
        $data = $user->createToken($request->device_name)->plainTextToken;
        return response()->json([
            'status' => 200,
            'message' => 'User Logged In Successfully',
            'token' => $data
        ], 200);

    }


    function register(Request $request)
    {
        DB::beginTransaction();
        try {
            $request->merge(["password" => bcrypt($request->password)]);
            User::create($request->all());
            DB::commit();

            return response()->json([
                'status' => 200,
                'message' => 'User Created Successfully',
            ], 200);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json([
                'status' => 422,
                'message' => $th->getMessage(),
                'errors' => $th->getCode(),
                'result' => 'failed',
                'data' => null
            ], 422);
        }
    }


    function get_users()
    {
        try {
            //code...
            $users = User::get();
            return response()->json([
                'status' => 200 , 
                'messages' => '' , 
                'data' => $users
            ] , 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status' => 422 , 
                'messages' => '' , 
                'data' => null
            ] , 422);
        }
    }
    

    

    function logout(Request $request)
    {
        $user = Auth::user();
        // Revoke a specific token...
        $user->tokens()->where('tokenable_id', $user->id)->delete();

        return response()->json([
            'status' => 200,
            'message' => null,
            'result' => 'logged out successfully',
        ], 200);
    }


}

