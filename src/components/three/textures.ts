// Real 2K texture maps in /public/textures (Solar System Scope, CC BY 4.0).
// Served from the public root; lazy-loaded per body via drei's useTexture.

const base = import.meta.env.BASE_URL

/** Surface map for a body id: sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune. */
export function bodyTextureUrl(id: string): string {
  return `${base}textures/${id}.jpg`
}

export const saturnRingUrl = `${base}textures/saturn-ring.png`
