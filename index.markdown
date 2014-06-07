---
layout: name
title: Home
keywords: Hari Sundar, parallel algorithms, inverse problems, medical imaging, octree, multigrid, interventional cardiology, biomechanics, biophysics, image-guided surgery, partial differential equations, supercomputing
section: Home
---

<img class='inset right' src='/~hari/images/hari1.png' title='Hari Sundar' alt='Photo of hari' width='140px' />

I am a Researcher at the Institute for Computational Engineering & Sciences ([ICES](http://www.ices.utexas.edu)) at the [University of Texas at Austin](http://www.utexas.edu). I am part of the [Parallel Algorithms for Data Analysis and Simulation](http://padas.ices.utexas.edu/) and [Center for Computational Geosciences & Optimization](http://www.ices.utexas.edu/research/centers-groups/ccgo/) research groups at ICES.

I will be joining the [School of Computing](http://www.cs.utah.edu/) at the [University of Utah](http://www.utah.edu/) next year as an assistant professor.

+--	{.section}
[Research](/~hari/work)
========

The central focus of my research is the development of such computationally optimal  _parallel, high-performance algorithms_, both discrete and continuous, that are efficient and scalable on state-of-the-art architectures. It is driven by applications in _biosciences_ and _geophysics_, such as cardiovascular mechanics, medical image analysis, and seismic wave propagation. My research has resulted in the development of state-of-the-art distributed algorithms for [adaptive mesh refinement](/~hari/files/pubs/sc07.pdf), [geometric multigrid](/~hari/files/pubs/sc12.pdf), [fast Gauss transform](/~hari/files/pubs/sc10.pdf) and [sorting](/~hari/files/pubs/sc13.pdf). 
        
&rarr; [Selected Publications](/~hari/work/pubs) | [Google Scholar](http://scholar.google.com/citations?user=equOxc0AAAAJ)    
     
&rarr; [Recent CV](/~hari/files/cv_acad.pdf) | [Research Statement](/~hari/files/research.pdf)

=--

+--	{.section}
Talks
=====
Some of my recent and upcoming [talks](/~hari/talks).


{% for post in site.categories.talks limit:5 %}
<div class="section list">
  <h1>{{ post.date | date_to_string }}</h1>
  <p class="line">
  	<a class="title" href="/~hari/{{ post.url }}">{{ post.title }}</a>,
	<a class="excerpt" href="{{ post.link }}">{{ post.location }}</a>.
	</p>
</div>
{% endfor %}

=--

+-- {.section}
Blogs
=====
I maintain a research blog called _[Seq & Par](/~hari/sap)_. Recent posts include:
{% for post in site.categories.sap limit:3 %}
<ul class="compact recent">
<li>
	<a href="/~hari/{{ post.url }}" title="{{ post.excerpt }}">{{ post.title }}</a>
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
