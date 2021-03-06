#+CATEGORY: presentation
#+STARTUP: content

#+SPDX-FileCopyrightText: 2021 Jens Neuhalfen <https://neuhalfen.name/>
#+SPDX-License-Identifier: CC-BY-SA-4.0

#+OPTIONS: reveal_center:t reveal_progress:t reveal_history:t reveal_control:t
#+OPTIONS: reveal_mathjax:t reveal_rolling_links:t reveal_keyboard:t reveal_overview:t

#+OPTIONS: toc:1 num:nil
#+OPTIONS: timestamp:nil
#+OPTIONS: ^:nil
#+OPTIONS: tags:nil


#+REVEAL_VERSION: 4
#+REVEAL_ROOT: js/reveal.js
#+REVEAL_MATHJAX_URL:   js/tex-chtml.js

#+OPTIONS: reveal_width:1200 reveal_height:900
#+REVEAL_MARGIN: 0.00
#+REVEAL_MIN_SCALE: 0.5
#+REVEAL_MAX_SCALE: 2.5

#+REVEAL_TRANS: fade
#+REVEAL_HLEVEL: 1
#+REVEAL_EXTRA_CSS: ./css/slides.css

#+HTML_HEAD: <link rel="shortcut icon" href="./img/site/favicon.ico">
#+HTML_HEAD: <link rel="icon" type="image/png" sizes="16x16" href="./img/site/favicon-16x16.png">
#+HTML_HEAD: <link rel="icon" type="image/png" sizes="32x32" href="./img/site/favicon-32x32.png">
#+HTML_HEAD: <link rel="icon" type="image/png" sizes="48x48" href="./img/site/favicon-48x48.png">

#+MACRO: color @@latex:{\color{$1}@@ @@html:<span class="$1">@@ $2 @@latex:\@@@@html:</span>@@

#+MACRO: red {{{color(red, $1)}}}
#+MACRO: blue {{{color(blue, $1)}}}
#+MACRO: green {{{color(green, $1)}}}
