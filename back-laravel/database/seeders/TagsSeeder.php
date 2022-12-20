<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tag_chiyoda = [
            'name' => 'chiyoda'
        ];
        DB::table('tags')->insert($tag_chiyoda);
        $tag_minato = [
            'name' => 'minato'
        ];
        DB::table('tags')->insert($tag_minato);
        $tag_shinjuku = [
            'name' => 'shinjuku'
        ];
        DB::table('tags')->insert($tag_shinjuku);
        $tag_shibuya = [
            'name' => 'shibuya'
        ];
        DB::table('tags')->insert($tag_shibuya);
    }
}
