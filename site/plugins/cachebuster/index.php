<?php

Kirby::plugin('violet/cachebuster', [
    'components' => [
        'css' => function ($kirby, $url, $options) {
            if ($url === '@auto') {
                if (!$url = Url::toTemplateAsset('styles/templates', 'css')) {
                    return null;
                }
            }

            return $url . '?v=' . F::modified($url);
        },
        'js' => function ($kirby, $url, $options) {
            if ($url === '@auto') {
                if (!$url = Url::toTemplateAsset('scripts/templates', 'js')) {
                    return null;
                }
            }

            return $url . '?v=' . F::modified($url);
        }
    ],
]);