<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class DriverController extends Controller
{
    function sign_in(Request $request)
    {
        $driver = Driver::where('email', $request->email)->first();
        if (!$driver) {
            return response()->json([
                'status' => 422,
                'message' => __(''),
            ], 422);
        }
 
        if (! $driver || ! Hash::check($request->password, $driver->password)) {
            throw ValidationException ::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
     
        $data = $driver->createToken($request->device_name)->plainTextToken;
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
            $client = Driver::create($request->all());
            DB::commit();

            return response()->json([
                'status' => 200,
                'message' => 'User Created Successfully',
                'token' => $client->createToken("API TOKEN")->plainTextToken,
                'otp' => $client->otp
            ], 200);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json([
                'status' => 422,
                'message' => null,
                'errors' => 'rtrwt',
                'result' => 'failed',
                'data' => null
            ], 422);
        }
    }



    function get_drivers()
    {
        try {
            //code...
            $drivers = Driver::get();
            return response()->json([
                'status' => 200 , 
                'messages' => '' , 
                'data' => $drivers
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
    
}
