<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    function create_message(Request $request)
    {
        try {
            
            $messageContent = base64_encode($request->message); 
            $message = Message::create([
                'message' => $messageContent ,
                'user_id' => $request->user_id ,
                'driver_id' => $request->driver_id
            ]);
            response()->json([
                'status' => 200,
                'message' => 'success',
                'result' => $message,
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status' => 422,
                'message' => $th->getMessage(),
                'errors' => $th->getCode(),
                'result' => 'failed',
                'data' => null
            ], 422);
        }

    }
}
