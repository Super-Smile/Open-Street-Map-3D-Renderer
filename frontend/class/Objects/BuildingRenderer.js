function BuildingRenderer(way) {
	
	this.setWay = function(way) {
		this.way = way;
	}

	this.isValid = function() {
		if(this.way.tags['building']
		) {
			return true;
		}
		return false;
	}

	this.render = function() {
		this.drawBuilding(this.way);
	}

	this.drawBuilding = function(way, properties) {
    
    var oldCoord;
    var newCoord;
	var color1 = 0xC0C0C0;

	var height = Math.floor(Math.random() * 50) + 20;
	//	height = 10;
    
    var coordCount = way.coordinates.length;
    for (var i = 0; i < coordCount; i++) {
        var geometry = new THREE.Geometry();
            var coord = way.coordinates[i];
            newCoord = area.getPixelPosition(coord.lat, coord.lon);
            
            if (oldCoord != undefined) {
                
                var vector1 = new THREE.Vector3(oldCoord[0], 0      , oldCoord[1]);
                var vector2 = new THREE.Vector3(newCoord[0], 0      , newCoord[1]);
                var vector3 = new THREE.Vector3(oldCoord[0], height , oldCoord[1]);
                var vector4 = new THREE.Vector3(newCoord[0], height , newCoord[1]);
                
                // Dem Objekt hinzuf?gen
                geometry.vertices.push(vector1);
                geometry.vertices.push(vector2);
                geometry.vertices.push(vector3);
                geometry.vertices.push(vector4);
                
                //geometry.faces.push(new THREE.Face3(0, 1, 2));
                //geometry.faces.push(new THREE.Face3(3, 2, 1));
                geometry.faces.push(new THREE.Face4(0, 2, 3, 1));
//                            var material = new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, overdraw: true } );
				var material = new THREE.MeshBasicMaterial( { color: color1 } );
                var mesh = new THREE.Mesh(geometry, material);
                mesh.doubleSided = true;
				mesh.castShadow = true;
				mesh.receiveShadow = true;
                scene.add(mesh);
                
                /*
                var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 }));
                scene.add(line);
                */
                
                
                
                
                
                
                
            }
            oldCoord = newCoord;
        }

}
}
