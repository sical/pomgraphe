## Projet Pomgraph

auteur: Yannis Hutt et Adrien Guédet 

interface graphique permettant de visualiser un graphe de co-auteurs d'article scientifique dans une interface en javascript.

## Librairies


* D3.js
* Bootstrap

```markdown
Arborescence

- ./bibtex_parsing
    - /bibtex_data
    - graph_lien.js
    - Json_Builder.ipynb
    - parsing.ipynb
    - pipeline.ipynb
    - test.json
- ./css
- ./d3
- ./Ipython
- ./scss
- ./vendor
- index.html

```
dans le dossier [bibtex_parsing] nous pouvons trouver les data provenant de DBLP, ainsi que les fichiers js qui permettent la création et la visualisation du graphe. Il y a aussi les fichiers python pour le parsing et la pipeline des données.

L'interface peut-être lancer depuis le fichier index
.html qui s'ouvre sur un navigateur web.

