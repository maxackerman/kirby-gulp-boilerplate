<?php snippet('header') ?>
  <h1><?= $page->title()->html() ?></h1>

  <ul>
  <?php foreach($site->pages() as $p): ?>
    <li>
      <a href="<?= $p->url() ?>"><?= $p->title() ?></a>
    </li>
  <?php endforeach; ?>
  </ul>

  <?php foreach($page->images() as $image): ?>
    <?=  $image->resize(300); ?>
  <?php endforeach; ?>

<?php snippet('footer') ?>


