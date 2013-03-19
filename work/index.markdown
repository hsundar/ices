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

__Graph Coloring__ is a form of graph labeling, wherein we wish to label(color) vertices such that no two adjacent vertices have the same color. It is of interest to my research due to its use in parallelization of algorithms such as the [Gauß-Seidel method](http://en.wikipedia.org/wiki/Gauss%E2%80%93Seidel_method).
I have a simple 2D [javascript demo](/~hari/code/coloring) exploring coloring issues on quadtrees. 

=--

+-- {.section}
Imaging
=======
All the imaging stuff. __Mutual information__, __Mellin Stuff__, __2d3d Registration__

=--

+-- {.section}
Biomechanics
============

My dissertation research involved the development of a method for the analysis of Magnetic Resonance (MR) cardiac images with the goal of reconstructing the motion of the myocardial tissue. The main feature of our method is that the inversion parameter field is the active contraction of the myocardial fibers. This is accomplished with a biophysically-constrained, four-dimensional (space plus time) formulation that aims to complement information that can be gathered from the images by _a priori_ knowledge of cardiac mechanics and electrophysiology. Incorporating biomechanical priors introduces major computational challenges, which constitute the main issue tackled by my dissertation research.

Our main hypothesis is that by incorporating biophysical information, we can generate more informative priors and thus, more accurate predictions of the ventricular wall motion. In this thesis, we outline the formulation, discuss the computational methodology for solving the inverse motion estimation, and present results using synthetic and tagged MR data. We also present methods for generating and solving using a spatially non-uniform octree meshing scheme with an adjoint-based inversion solver. The overall method uses patient-specific MR data and fiber information to reconstruct the motion. Additional information is available on my [biomechanics](/~hari/work/biomech) page.

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

