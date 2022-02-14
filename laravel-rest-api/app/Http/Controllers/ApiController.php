<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Yaml\Yaml;


/**
 * ApiController
 */
class ApiController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * parse
     *
     * @param  mixed $request
     * @return void
     */
    public function parseYaml(Request $request)
    {
        $data = [];
        $yamlInput = $request->json()->get('yamlInput');
        if (!empty($yamlInput)) {
            $parsedYamlInput = Yaml::parse($yamlInput);
            $data = $parsedYamlInput;
        }

        return response()->json($data, 200);
    }
}
