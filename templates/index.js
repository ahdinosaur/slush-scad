var createScene = require('gl-plot3d')
var createMesh = require('gl-mesh3d')
var parseStl = require('parse-stl')
var fs = require('fs')

var stl = fs.readFileSync(__dirname + '/index.stl')
var mesh = parseStl(stl)

var scene = createScene()
var glMesh = createMesh({
  gl:         scene.gl,
  cells:      mesh.cells,
  positions:  mesh.positions,
  colormap:   'jet'
})
scene.add(glMesh)
