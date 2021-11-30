<?php
  if(isset($alt) && ($alt != '')){
    $alt = $alt;
  }elseif($image->alt()){
    $alt = $image->alt()->html();
  }else{
    $alt = '';
  }
?>
<img
  <?php if ( $thumbsizes = option('thumbs.srcsets.default') ): ?>
  src="<?= $image->resize( $thumbsizes[0] )->url() ?>"
  data-srcset="<?= $image->srcset() ?>"
  data-sizes="auto"
  <?php else: ?>
  src="<?= $image->url() ?>"
  data-src="<?= $image->url() ?>"
  <?php endif ?>
  class="lazyload <?= isset($class) ? $class : null; ?>"
  width="<?= $image->width() ?>"
  height="<?= $image->height() ?>"
  alt="<?= $alt ?>"
>