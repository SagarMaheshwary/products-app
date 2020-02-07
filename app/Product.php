<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'image',
        'quantity',
    ];
}
