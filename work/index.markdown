---
layout: name
title: Research
section: Work
---

<img class='inset right' src='/images/hari2.png' title='Hari Sundar' alt='Photo of hari at work' width='140px' />

Research
========

Here are brief descriptions of my current areas of research. A selected list of publications is available [here](/work/pubs) and a complete list can be found on [Google Scholar](http://scholar.google.com/citations?user=equOxc0AAAAJ).


+-- {.section}
Multigrid
=========
<img class='inset top' src='/images/multigrid.png' title='Grid Hierarchy' alt='Grid hierarchy' width='480px' />

In this article we present a parallel geometric multigrid (GMG) method for solving variable-coefficient elliptic partial differential equations on arbitrary geometries using highly unstructured forests of octrees. The forest is an unstructured mesh of warped cuboids, each of which is further refined as an octree, enabling us to generate conforming meshes for highly warped geometries while retaining high levels of local refinement. We use algebraic multigrid (AMG) as the coarse grid solver for GMG, giving us ability to adjust the number of GMG and AMG levels based on the application. We present numerical experiments for the 3D variable-coefficient Poisson problem that demonstrates the scalability of our method. Our largest run was a highly non-uniform mesh of the earth's mantle, with 80-Billion unknowns using 262,144 cores on NCCS's Jaguar.

=--

+-- {.section}
Sorting
=======

describe sort work
=--

+-- {.section}
Graph Algos
===========
<img class='inset top' src='/images/dewall.png' title='Grid Hierarchy' alt='Grid hierarchy' width='480px'/>

__Relative Neighborhood Graphs__ We present a parallel algorithm for computing cycle orders and cycle perimeters in relative neighborhood graphs (Urquhart approximations) derived from histopathological image data. This algorithm would enable the study of correlations between macroscopic imaging biomarkers of prostate cancer and these important graph-theoretic microscopic biomarkers and may also allow the rapid automated Gleason scoring or cancer detection in prostate biopsy slides. Our algorithm consists of the following steps: (1) Uniform partitioning of the nuclei across processes, (2) Parallel Delaunay triangulation and (3) Parallel computation of the the RNG and the cycle orders and perimeters. We have evaluated our algorithm on a whole-mount histopathology slide obtained after radical prostatectomy. The single-process sequential version of our parallel algorithm offers a significant speed-up over a straightforward sequential algorithm and we demonstrate excellent fixed-size and isogranular parallel scalabity upto 384 processes.

__Graph Coloring__ Take a look at the javascript demo. 

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
[Publications](/work/pubs/)
============
I have [published](/work/pubs/) papers on topics in image registration, image segmentation, parallel adaptive meshing for finite element analysis, parallel multigrid, cardiac biomechanics, and image-guided surgery. A complete list can be found on my [Google Scholar](http://scholar.google.com/citations?user=equOxc0AAAAJ) page.
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

