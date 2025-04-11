<!-- 
Controller per il login e logout -->
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('API Token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function getUser(Request $request)
    {
        return $request->user(); // Restituisce i dati dell'utente autenticato
    }

    public function logout(Request $request)
    {
        // Assicurati che l'utente sia autenticato
        if ($request->user()) {
            Log::info('Logout richiesto da:', ['user_id' => $request->user()->id]);

            // Invalida il token dell'utente
            $request->user()->currentAccessToken()->delete();

            return response()->json(['message' => 'Logout effettuato con successo']);
        } else {
            return response()->json(['message' => 'Nessun utente autenticato'], 401);
        }
    }
}
