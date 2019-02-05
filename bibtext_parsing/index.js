// new Vue({
//     el: '#app',
//     data: {
//       graph: {
//         nodes: d3.range(100).map(i => ({ index: i, x: null, y: null })),
//         links: d3.range(99).map(i => ({ source: Math.floor(Math.sqrt(i)), target: i + 1 }))
//       },
//       width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
//       height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 40,
//       padding: 20,
//       colors: ['#2196F3', '#E91E63', '#7E57C2', '#009688', '#00BCD4', '#EF6C00', '#4CAF50', '#FF9800', '#F44336', '#CDDC39', '#9C27B0'],
//       simulation: null,
//       currentMove: null
//     },
//     computed: {
//       bounds() {
//         return {
//           minX: Math.min(...this.graph.nodes.map(n => n.x)),
//           maxX: Math.max(...this.graph.nodes.map(n => n.x)),
//           minY: Math.min(...this.graph.nodes.map(n => n.y)),
//           maxY: Math.max(...this.graph.nodes.map(n => n.y))
//         }
//       },
//       coords() {
//         return this.graph.nodes.map(node => {
//           return {
//             x: this.padding + (node.x - this.bounds.minX) * (this.width - 2*this.padding) / (this.bounds.maxX - this.bounds.minX),
//             y: this.padding + (node.y - this.bounds.minY) * (this.height - 2*this.padding) / (this.bounds.maxY - this.bounds.minY)
//           }
//         })
//       }
//     },
//     created(){
//        this.simulation = d3.forceSimulation(this.graph.nodes)
//           .force('charge', d3.forceManyBody().strength(d => -100))
//           .force('link', d3.forceLink(this.graph.links))
//           .force('x', d3.forceX())
//           .force('y', d3.forceY())
//     },
//     methods: {
//       drag(e) {
//         if (this.currentMove) {
//           this.currentMove.node.fx = this.currentMove.node.x - (this.currentMove.x - e.screenX) * (this.bounds.maxX - this.bounds.minX) / (this.width - 2 * this.padding)
//           this.currentMove.node.fy = this.currentMove.node.y -(this.currentMove.y - e.screenY) * (this.bounds.maxY - this.bounds.minY) / (this.height - 2 * this.padding)
//           this.currentMove.x = e.screenX
//           this.currentMove.y = e.screenY
//         }
//       },
//       drop(){
//         delete this.currentMove.node.fx
//         delete this.currentMove.node.fy    
//         this.currentMove = null
//         this.simulation.alpha(1)
//         this.simulation.restart()
//       }
//     }
//   })