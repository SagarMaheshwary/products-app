<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * Catch all routes and map them to the index
 * method of HomeController which will simply
 * return the home view so we can let reactjs
 * handle all the application routing.
 */
Route::get('/{any}', 'HomeController@index')->where('any', '.*');