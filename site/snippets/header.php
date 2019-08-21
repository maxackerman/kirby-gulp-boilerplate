<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title><?php echo html($site->title());  e($page->isHomePage(), '', ' - ' . html($page->title()) ) ?></title>
  <meta name="description" content="<?php echo $site->description()->html() ?>">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6b4199">
  <?php echo css('assets/css/index.css') ?>
</head>
<body class="<?= $page->template() ?>">