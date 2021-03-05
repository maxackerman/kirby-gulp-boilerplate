<?php

return [
  'debug' => true,
  'robots' => false,
  'thumbs' => [
    'srcsets' => [
      'default' => [400, 1000, 1500, 2000, 2300, 2600, 2800, 3000]
    ],
  ],
  'kirbytext.image.figure' => false,
  'hooks' => [
    'file.create:after' => function($file) {
      $widths = option('thumbs.srcsets.default');
      if($file->isResizable()) {
        foreach($widths as $width) {
          try {
            $resizedImage = $file->resize($width)->save();
          }
          catch (Exception $e) {
            throw new Exception($e->getMessage());
          }
        }
      }
    }
  ]
];