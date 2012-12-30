---
layout: name
title: Home

section: Home
---

<img class='inset right' src='/images/hari1.png' title='Hari Sundar' alt='Photo of hari' width='140px' />

I am a Researcher at the Institute for Computational Engineering & Sciences ([ICES](http://www.ices.utexas.edu)) at the [University of Texas at Austin](http://www.utexas.edu). I am part of the [Parallel Algorithms for Data Analysis and Simulation](http://padas.ices.utexas.edu/) and [Center for Computational Geosciences & Optimization](http://www.ices.utexas.edu/research/centers-groups/ccgo/) research groups at ICES.

+--	{.section}
[Research](/work)
========

My research focuses on inverse problems, distributed and parallel algorithms, and medical image-analysis. The main applications driving my work are in soft tissue and cardiovascular mechanics, computer vision & machine learning.

=--

+-- {.section}
Talks
=====
Some of my recent and upcoming talks.


{% for post in site.categories.talks limit:5 %}
<div class="section list">
  <h1>{{ post.date | date_to_string }}</h1>
  <p class="line">
  <a class="title" href="{{ post.url }}">{{ post.title }}</a>,
	<a class="excerpt" href="{{ post.link }}">{{ post.location }}</a>.
	</p>
</div>
{% endfor %}

=--

+-- {.section}
Blogs
=====
I maintain a research blog called _[Seq & Par](/sap)_ as a place for random musings.
Recent posts include:
{% for post in site.categories.sap limit:3 %}
<ul class="compact recent">
<li>
	<a href="{{ post.url }}" title="{{ post.excerpt }}">{{ post.title }}</a>
	<span class="date">{{ post.date | date_to_string }}</span> 
</li>
</ul>
{% endfor %}
=--

+-- {.section}
Contact
=======
I can be reached at work by phone on (+1) 512 471 4207,  
by email at <hari@ices.utexas.edu>.  
or in person at ACE 4.234 ([Map](http://www.utexas.edu/maps/main/buildings/ace.html)).
=--
