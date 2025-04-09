<?php

return [

  'paths' => ['api/*', 'login', 'logout', 'sanctum/csrf-cookie', 'user'],

  'allowed_methods' => ['*'],

  'allowed_origins' => ['http://localhost:5174'],

  'allowed_origins_patterns' => [],

  'allowed_headers' => ['*'],

  'exposed_headers' => [],

  'max_age' => 0,

  'supports_credentials' => true, // Importante per l'invio dei cookie
];
