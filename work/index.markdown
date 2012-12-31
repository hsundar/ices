---
layout: name
title: Research
section: Work
---

<img class='inset right' src='/~hari/images/hari2.png' title='Hari Sundar' alt='Photo of hari at work' width='140px' />

Research
========

Here are brief descriptions of my current areas of research. A selected list of publications is available [here](/~hari/work/pubs) and a complete list can be found on [Google Scholar](http://scholar.google.com/citations?user=equOxc0AAAAJ). 

+-- {.section}
Octrees
=======

My dissertation research on algorithms for constructing and balancing octrees in parallel. Algorithms for fast meshing based on octrees from points and image data were also developed. The mesh is used for solving PDEs on using the finite element method. This work has been extended to include multigrid solvers and is [freely available](/~hari/code/). The work has also been extended to include complex geometries as a forest of octrees ([p4est](http://www.p4est.org/)). 

_Related talks & posts_
{% for post in site.tags.octree %}
<ul class="compact recent">
<li>
	<a href="/~hari/{{ post.url }}" title="{{ post.excerpt }}">{{ post.title }}</a>
	<span class="date">{{ post.date | date_to_string }}</span> 
</li>
</ul>
{% endfor %}

=--

+-- {.section}
Multigrid
=========
<img class='inset top' src='/~hari/images/multigrid.png' title='Grid Hierarchy' alt='Grid hierarchy' width='480px' />

My current research involved developing parallel geometric multigrid (GMG) methods for solving variable-coefficient elliptic partial differential equations on arbitrary geometries using highly unstructured forests of octrees. We use algebraic multigrid (AMG) as the coarse grid solver for GMG, giving us ability to adjust the number of GMG and AMG levels based on the application. Numerical experiments for the 3D variable-coefficient Poisson problem demonstrate the scalability of our method and our largest run was a highly non-uniform mesh of the earth's mantle, with 80-Billion unknowns using 262,144 cores on NCCS's Jaguar. I am currently working on extending this to support **higher-order** discretizations.

_Related talks & posts_
{% for post in site.tags.multigrid %}
<ul class="compact recent">
<li>
	<a href="/~hari/{{ post.url }}" title="{{ post.excerpt }}">{{ post.title }}</a>
	<span class="date">{{ post.date | date_to_string }}</span> 
</li>
</ul>
{% endfor %}

=--

+-- {.section}
Sorting
=======

Sorting is one of the most fundamental algorithms in computer science. It is also an essential building block for developing scalable parallel algorithms.

=--

+-- {.section}
Graph Algos
===========
<img class='inset top' src='/~hari/images/dewall.png' title='Grid Hierarchy' alt='Grid hierarchy' width='480px'/>

__Relative Neighborhood Graphs__ We present a parallel algorithm for computing cycle orders and cycle perimeters in relative neighborhood graphs (Urquhart approximations) derived from histopathological image data. This algorithm would enable the study of correlations between macroscopic imaging biomarkers of prostate cancer and these important graph-theoretic microscopic biomarkers and may also allow the rapid automated Gleason scoring or cancer detection in prostate biopsy slides. Our algorithm consists of the following steps: (1) Uniform partitioning of the nuclei across processes, (2) Parallel Delaunay triangulation and (3) Parallel computation of the the RNG and the cycle orders and perimeters. We have evaluated our algorithm on a whole-mount histopathology slide obtained after radical prostatectomy. The single-process sequential version of our parallel algorithm offers a significant speed-up over a straightforward sequential algorithm and we demonstrate excellent fixed-size and isogranular parallel scalabity upto 384 processes.

__Graph Coloring__ Take a look at the [javascript demo](/~hari/code/coloring). 

=--

+-- {.section}
Imaging
=======
All the imaging stuff
=--

+-- {.section}
Biomechanics
============
Thesis stuff
=-- 

+-- {.section}
[Publications](/~hari/work/pubs/)
============
I have [published](/~hari/work/pubs/) papers on topics in image registration, image segmentation, parallel adaptive meshing for finite element analysis, parallel multigrid, cardiac biomechanics, and image-guided surgery. A complete list can be found on my [Google Scholar](http://scholar.google.com/citations?user=equOxc0AAAAJ) page.
=--
+-- {.section}
Activities
==========
I have reviewed for several journals ([SIAM Journal on Scientific Computing][sisc], [Medical Image Analysis][media], [IEEE Trans. on BioMed. Engg.][tbme] and [IEEE Trans. on Med. Imaging][tmi]) and conferences ([Supercomputing][sc], [MICCAI][], [CVPR][], and [ISBI][]).
=--

[pami]: http://www.computer.org/tpami/
[sisc]: http://www.siam.org/journals/sisc.php
[tmi]: http://www.ieee-tmi.org/
[tbme]: http://tbme.embs.org/
[media]: http://www.journals.elsevier.com/medical-image-analysis/
[MICCAI]: http://www.miccai.org/
[sc]: http://supercomputing.org/
[CVPR]: http://www.pamitc.org/cvpr13/
[ISBI]: http://www.biomedicalimaging.org/

[research]: /work/
[scholar]: http://scholar.google.com/citations?user=equOxc0AAAAJ
[personal]: /
[code]: /code/

