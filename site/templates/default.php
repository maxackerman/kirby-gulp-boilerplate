<?php snippet('header') ?>
  <h1><?= $page->title()->html() ?></h1>

  <ul>
  <?php foreach($site->pages() as $p): ?>
    <li>
      <a href="<?= $p->url() ?>"><?= $p->title() ?></a>
    </li>
  <?php endforeach; ?>
  </ul>

  <div class="grid-wrapper col-pad">
  <?php foreach($page->images() as $image): ?>
    <div class="col-6 col-pad">
      <?php snippet('lazy-image', ['image' => $image]) ?>
    </div>
  <?php endforeach; ?>
  </div>

<?php snippet('footer') ?>


