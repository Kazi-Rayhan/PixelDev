import * as THREE from 'three';

let scene, camera, renderer, laptop, starfield, animationId;
let stars = [];
const starSpeed = 1.5; // Speed of stars moving backward
const textSpeed = 0.3; // Speed of text moving forward

function init3D() {
    const canvasContainer = document.getElementById('hero-canvas');
    if (!canvasContainer) return;

    // Scene setup
    scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // Camera setup - POV from spaceship cockpit
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 0); // Camera at origin (your POV)

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);
    canvasContainer.style.pointerEvents = 'none'; // Allow clicks to pass through

    // Create starfield - stars moving backward (left behind as you move forward)
    const starCount = 1500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starColors = new Float32Array(starCount * 3);

    // Retro neon colors
    const colors = [
        [0, 255, 209],    // retro-teal
        [99, 102, 241],   // retro-indigo
        [6, 182, 212],    // retro-cyan
        [16, 185, 129],   // retro-emerald
        [139, 92, 246],   // retro-purple
    ];

    for (let i = 0; i < starCount; i++) {
        // Random position behind and around camera (z < 0 means behind you)
        const x = (Math.random() - 0.5) * 30;
        const y = (Math.random() - 0.5) * 30;
        const z = -(Math.random() * 100 + 10); // Start behind camera
        
        starPositions[i * 3] = x;
        starPositions[i * 3 + 1] = y;
        starPositions[i * 3 + 2] = z;
        
        // Random size
        starSizes[i] = Math.random() * 2 + 0.3;
        
        // Random color from palette
        const color = colors[Math.floor(Math.random() * colors.length)];
        starColors[i * 3] = color[0] / 255;
        starColors[i * 3 + 1] = color[1] / 255;
        starColors[i * 3 + 2] = color[2] / 255;
        
        stars.push({ z });
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    starfield = new THREE.Points(starGeometry, starMaterial);
    scene.add(starfield);

    // Create laptop wireframe (positioned ahead, moving forward with you)
    const laptopGroup = new THREE.Group();

    // Laptop base (bottom part)
    const baseGeometry = new THREE.BoxGeometry(3, 0.2, 2);
    const baseMaterial = new THREE.MeshBasicMaterial({
        color: 0x00FFD1, // retro-teal
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -0.5;
    base.position.z = 12; // Position ahead of camera
    laptopGroup.add(base);

    // Laptop screen (top part)
    const screenGeometry = new THREE.BoxGeometry(3, 2, 0.1);
    const screenMaterial = new THREE.MeshBasicMaterial({
        color: 0x6366F1, // retro-indigo
        wireframe: true,
        transparent: true,
        opacity: 0.7
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.y = 1.2;
    screen.position.z = 12;
    screen.rotation.x = -0.3; // Slight angle
    laptopGroup.add(screen);

    // Screen inner glow (screen content area)
    const screenInnerGeometry = new THREE.PlaneGeometry(2.5, 1.5);
    const screenInnerMaterial = new THREE.MeshBasicMaterial({
        color: 0x06B6D4, // retro-cyan
        wireframe: true,
        transparent: true,
        opacity: 0.4
    });
    const screenInner = new THREE.Mesh(screenInnerGeometry, screenInnerMaterial);
    screenInner.position.copy(screen.position);
    screenInner.position.z += 0.05;
    screenInner.rotation.x = screen.rotation.x;
    laptopGroup.add(screenInner);

    // Keyboard keys (decorative grid)
    const keysGeometry = new THREE.BoxGeometry(2.5, 0.1, 1.5);
    const keysMaterial = new THREE.MeshBasicMaterial({
        color: 0x10B981, // retro-emerald
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const keys = new THREE.Mesh(keysGeometry, keysMaterial);
    keys.position.y = -0.4;
    keys.position.z = 12;
    laptopGroup.add(keys);

    laptop = laptopGroup;
    scene.add(laptop);

    // Animation loop - POV moving forward through space
    function animate() {
        animationId = requestAnimationFrame(animate);

        const time = Date.now() * 0.001;
        
        // Move stars backward (left behind as you move forward)
        const positions = starfield.geometry.attributes.position.array;
        
        for (let i = 0; i < starCount; i++) {
            // Move star backward (away from camera)
            positions[i * 3 + 2] -= starSpeed * (1 + Math.random() * 0.3);
            
            // Reset star if it goes too far behind
            if (positions[i * 3 + 2] < -120) {
                positions[i * 3] = (Math.random() - 0.5) * 30;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
                positions[i * 3 + 2] = -10; // Reset just behind camera
            }
            
            // Stars get dimmer as they move further back
            const distance = Math.abs(positions[i * 3 + 2]);
            const brightness = Math.max(0.2, 1 - distance / 100);
            const colors = starfield.geometry.attributes.color.array;
            colors[i * 3] = colors[i * 3] * brightness;
            colors[i * 3 + 1] = colors[i * 3 + 1] * brightness;
            colors[i * 3 + 2] = colors[i * 3 + 2] * brightness;
        }
        
        starfield.geometry.attributes.position.needsUpdate = true;
        starfield.geometry.attributes.color.needsUpdate = true;

        // Laptop moves forward with you (stays ahead)
        laptop.position.z += textSpeed;
        
        // Reset laptop position when it gets too close (loop effect)
        if (laptop.position.z > 20) {
            laptop.position.z = 12;
        }
        
        // Gentle rotation of laptop
        laptop.rotation.y += 0.002;
        laptop.rotation.x = Math.sin(time * 0.0005) * 0.03;

        // Pulsing effect for materials
        baseMaterial.opacity = 0.4 + Math.sin(time) * 0.2;
        screenMaterial.opacity = 0.5 + Math.cos(time * 1.2) * 0.2;
        screenInnerMaterial.opacity = 0.2 + Math.sin(time * 0.8) * 0.2;

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3D);
} else {
    init3D();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    if (renderer) {
        renderer.dispose();
    }
});

