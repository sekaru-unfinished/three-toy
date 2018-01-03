var scene, camera, renderer;
var geometry, material;
var meshes = [];

init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    for(var i=0; i<100; i++) {
        meshes.push(makeCube());
    }

    meshes.forEach(function (cube) {
        scene.add(cube);
    });

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);

    meshes.forEach(function (cube) {
        cube.rotation.x += _.random(0.005, 0.05);
        cube.rotation.y += _.random(0.005, 0.05);

        cube.position.x += (cube.tarX - cube.position.x) * 0.01;
        cube.position.y += (cube.tarY - cube.position.y) * 0.01;

        cube.scale.x += (cube.tarS - cube.scale.x) * 0.01;
        cube.scale.y += (cube.tarS - cube.scale.y) * 0.01;
        cube.scale.z += (cube.tarS - cube.scale.z) * 0.01;

        if(inRange(cube.position.x, cube.tarX) && inRange(cube.position.y, cube.tarY)) {
            if(cube.tarS < 1) cube.material.color.setHex(Math.random() * 0xffffff);
            cube.tarS = cube.tarS < 1 ? _.random(1.2, 2, true) : _.random(0.2, 0.5, true) ;
            cube.tarX = cube.tarX === 0 ? _.random(-1000, 1000, true) : 0;
            cube.tarY = cube.tarY === 0 ? _.random(-1000, 1000, true) : 0;
        }
    });

    renderer.render(scene, camera);
}

function makeCube() {
    var s = _.random(30, 60);

    geometry = new THREE.BoxGeometry(s, s, s);
    material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, wireframe: true });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 0;
    mesh.position.y = 0;

    mesh.tarX = _.random(-1000, 1000, true);
    mesh.tarY = _.random(-1000, 1000, true);

    mesh.tarS = _.random(1.2, 2, true);

    return mesh;
}

function inRange(val, val2) {
    var limit = 0.1;
    return _.inRange(val, val2-limit, val2+limit);
}