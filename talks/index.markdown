---
layout: name
title: Home
section: Home

keywords: Talks, Multigrid, Programming, Algorithms
---

Talks
=====

Here are my recent and upcoming talks,

{% for post in site.categories.talks %}
<div class="section list">
  <h1>{{ post.date | date_to_string }}</h1>
  <p class="line">
  <a class="title" href="/~hari/{{ post.url }}">{{ post.title }}</a>
  </p>
  <p class="excerpt">{{ post.location }}</p>
</div>
{% endfor %}

