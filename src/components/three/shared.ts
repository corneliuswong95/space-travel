import * as THREE from 'three'

// One sphere geometry reused across every body (scaled per planet via the mesh).
export const UNIT_SPHERE = new THREE.SphereGeometry(1, 48, 48)
