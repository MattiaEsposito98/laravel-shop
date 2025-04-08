<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
  /**
   * Mostra la dashboard dell'admin.
   */
  public function index()
  {
    return view('dashboard');
  }
}
