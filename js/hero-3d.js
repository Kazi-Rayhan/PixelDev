import * as THREE from 'three';

let scene, camera, renderer, laptop, starfield, galaxy, shootingStars, animationId;
let stars = [];
const starSpeed = 2.5; // Speed of stars moving backward
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
        2000
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

    // Retro neon colors
    const colors = [
        [0, 255, 209],    // retro-teal
        [99, 102, 241],   // retro-indigo
        [6, 182, 212],    // retro-cyan
        [16, 185, 129],   // retro-emerald
        [139, 92, 246],   // retro-purple
        [236, 72, 153],   // retro-pink
    ];

    // ========== GALAXY CREATION ==========
    function createGalaxy() {
        const galaxyGroup = new THREE.Group();
        const galaxyParticles = 5000;
        const galaxyGeometry = new THREE.BufferGeometry();
        const galaxyPositions = new Float32Array(galaxyParticles * 3);
        const galaxySizes = new Float32Array(galaxyParticles);
        const galaxyColors = new Float32Array(galaxyParticles * 3);

        const radius = 200;
        const branches = 3;
        const spin = 1;
        const randomness = 0.5;
        const randomnessPower = 3;
        const insideColor = new THREE.Color(0x00FFD1); // retro-teal
        const outsideColor = new THREE.Color(0x6366F1); // retro-indigo

        for (let i = 0; i < galaxyParticles; i++) {
            const i3 = i * 3;
            const radius = Math.random() * 200;
            const spinAngle = radius * spin;
            const branchAngle = ((i % branches) / branches) * Math.PI * 2;

            const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;
            const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;
            const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;

            galaxyPositions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            galaxyPositions[i3 + 1] = randomY;
            galaxyPositions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

            const mixedColor = insideColor.clone();
            mixedColor.lerp(outsideColor, radius / 200);
            galaxyColors[i3] = mixedColor.r;
            galaxyColors[i3 + 1] = mixedColor.g;
            galaxyColors[i3 + 2] = mixedColor.b;

            galaxySizes[i] = Math.random() * 0.8 + 0.2;
        }

        galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(galaxyPositions, 3));
        galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(galaxyColors, 3));
        galaxyGeometry.setAttribute('size', new THREE.BufferAttribute(galaxySizes, 1));

        const galaxyMaterial = new THREE.PointsMaterial({
            size: 0.8,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            transparent: true,
            opacity: 0.4
        });

        const galaxyMesh = new THREE.Points(galaxyGeometry, galaxyMaterial);
        galaxyMesh.position.set(0, 0, -400); // Position far behind
        galaxyGroup.add(galaxyMesh);

        // Add glowing center
        const centerGeometry = new THREE.SphereGeometry(8, 32, 32);
        const centerMaterial = new THREE.MeshBasicMaterial({
            color: 0x00FFD1,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending
        });
        const center = new THREE.Mesh(centerGeometry, centerMaterial);
        center.position.set(0, 0, -400);
        galaxyGroup.add(center);

        return galaxyGroup;
    }

    galaxy = createGalaxy();
    scene.add(galaxy);

    // ========== ENHANCED STARFIELD ==========
    const starCount = 3000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
        // Random position in a sphere around camera
        const radius = Math.random() * 500 + 50;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = -radius * Math.cos(phi); // Negative z means behind camera
        
        starPositions[i * 3] = x;
        starPositions[i * 3 + 1] = y;
        starPositions[i * 3 + 2] = z;
        
        // Random size with some larger stars
        starSizes[i] = Math.random() < 0.1 ? Math.random() * 1.5 + 0.8 : Math.random() * 0.8 + 0.2;
        
        // Random color from palette
        const color = colors[Math.floor(Math.random() * colors.length)];
        starColors[i * 3] = color[0] / 255;
        starColors[i * 3 + 1] = color[1] / 255;
        starColors[i * 3 + 2] = color[2] / 255;
        
        stars.push({ 
            z,
            originalColor: [color[0] / 255, color[1] / 255, color[2] / 255]
        });
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    starfield = new THREE.Points(starGeometry, starMaterial);
    scene.add(starfield);

    // ========== SHOOTING STARS ==========
    function createShootingStar() {
        const group = new THREE.Group();
        
        // Create trail
        const trailLength = 50;
        const trailGeometry = new THREE.BufferGeometry();
        const trailPositions = new Float32Array(trailLength * 3);
        const trailColors = new Float32Array(trailLength * 3);
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const colorR = color[0] / 255;
        const colorG = color[1] / 255;
        const colorB = color[2] / 255;
        
        for (let i = 0; i < trailLength; i++) {
            const i3 = i * 3;
            trailPositions[i3] = 0;
            trailPositions[i3 + 1] = 0;
            trailPositions[i3 + 2] = 0;
            
            const opacity = i / trailLength;
            trailColors[i3] = colorR * opacity;
            trailColors[i3 + 1] = colorG * opacity;
            trailColors[i3 + 2] = colorB * opacity;
        }
        
        trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
        trailGeometry.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));
        
        const trailMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending,
            linewidth: 1
        });
        
        const trail = new THREE.Line(trailGeometry, trailMaterial);
        group.add(trail);
        
        // Create bright head
        const headGeometry = new THREE.SphereGeometry(0.2, 8, 8);
        const headMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(colorR, colorG, colorB),
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        group.add(head);
        
        // Random starting position (from edges of screen)
        const side = Math.floor(Math.random() * 4);
        let startX, startY, startZ;
        const distance = 100;
        
        switch(side) {
            case 0: // Top
                startX = (Math.random() - 0.5) * 50;
                startY = 30;
                startZ = -distance;
                break;
            case 1: // Right
                startX = 30;
                startY = (Math.random() - 0.5) * 50;
                startZ = -distance;
                break;
            case 2: // Bottom
                startX = (Math.random() - 0.5) * 50;
                startY = -30;
                startZ = -distance;
                break;
            case 3: // Left
                startX = -30;
                startY = (Math.random() - 0.5) * 50;
                startZ = -distance;
                break;
        }
        
        group.position.set(startX, startY, startZ);
        
        // Random direction toward center
        const targetX = (Math.random() - 0.5) * 20;
        const targetY = (Math.random() - 0.5) * 20;
        const targetZ = -200;
        
        const direction = new THREE.Vector3(
            targetX - startX,
            targetY - startY,
            targetZ - startZ
        ).normalize();
        
        const speed = 3 + Math.random() * 2;
        
        return {
            group,
            direction,
            speed,
            trailGeometry,
            trailPositions,
            trailLength,
            color: [colorR, colorG, colorB],
            life: 0,
            maxLife: 100
        };
    }

    shootingStars = [];
    const maxShootingStars = 3;
    
    function addShootingStar() {
        if (shootingStars.length < maxShootingStars) {
            const star = createShootingStar();
            shootingStars.push(star);
            scene.add(star.group);
        }
    }
    
    // Add initial shooting stars
    for (let i = 0; i < maxShootingStars; i++) {
        setTimeout(() => addShootingStar(), i * 2000);
    }
    
    // Periodically add new shooting stars
    setInterval(() => {
        if (shootingStars.length < maxShootingStars) {
            addShootingStar();
        }
    }, 3000);

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

    // Animation loop - Epic space journey
    function animate() {
        animationId = requestAnimationFrame(animate);

        const time = Date.now() * 0.001;
        
        // ========== GALAXY ROTATION ==========
        galaxy.rotation.z += 0.0005;
        galaxy.rotation.y += 0.0003;
        
        // ========== STARFIELD MOVEMENT ==========
        const positions = starfield.geometry.attributes.position.array;
        const starColors = starfield.geometry.attributes.color.array;
        
        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            
            // Move star backward (away from camera)
            positions[i3 + 2] -= starSpeed * (1 + Math.random() * 0.3);
            
            // Calculate distance from camera
            const distance = Math.abs(positions[i3 + 2]);
            
            // Reset star if it goes too far behind
            if (distance > 600) {
                const radius = Math.random() * 100 + 50;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(Math.random() * 2 - 1);
                
                positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
                positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                positions[i3 + 2] = -radius * Math.cos(phi);
                
                // Reset color
                const originalColor = stars[i].originalColor;
                starColors[i3] = originalColor[0];
                starColors[i3 + 1] = originalColor[1];
                starColors[i3 + 2] = originalColor[2];
            } else {
                // Stars get dimmer as they move further back
                const brightness = Math.max(0.2, 1 - distance / 500);
                const originalColor = stars[i].originalColor;
                starColors[i3] = originalColor[0] * brightness;
                starColors[i3 + 1] = originalColor[1] * brightness;
                starColors[i3 + 2] = originalColor[2] * brightness;
            }
        }
        
        starfield.geometry.attributes.position.needsUpdate = true;
        starfield.geometry.attributes.color.needsUpdate = true;

        // ========== SHOOTING STARS ANIMATION ==========
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            const star = shootingStars[i];
            star.life++;
            
            // Move shooting star
            star.group.position.x += star.direction.x * star.speed;
            star.group.position.y += star.direction.y * star.speed;
            star.group.position.z += star.direction.z * star.speed;
            
            // Update trail
            const trailPos = star.trailPositions;
            for (let j = star.trailLength - 1; j > 0; j--) {
                const j3 = j * 3;
                const prevJ3 = (j - 1) * 3;
                trailPos[j3] = trailPos[prevJ3];
                trailPos[j3 + 1] = trailPos[prevJ3 + 1];
                trailPos[j3 + 2] = trailPos[prevJ3 + 2];
            }
            
            // Add new position at head
            trailPos[0] = star.group.position.x;
            trailPos[1] = star.group.position.y;
            trailPos[2] = star.group.position.z;
            
            star.trailGeometry.attributes.position.needsUpdate = true;
            
            // Remove if out of bounds or life expired
            if (star.life > star.maxLife || 
                Math.abs(star.group.position.x) > 100 || 
                Math.abs(star.group.position.y) > 100 || 
                star.group.position.z < -300) {
                scene.remove(star.group);
                shootingStars.splice(i, 1);
                
                // Create new shooting star after a delay
                setTimeout(() => addShootingStar(), 1000 + Math.random() * 2000);
            }
        }

        // ========== LAPTOP ANIMATION ==========
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

