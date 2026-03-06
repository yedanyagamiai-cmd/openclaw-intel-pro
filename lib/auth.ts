// API Key validation and rate limiting

interface ApiKeyConfig {
  tier: 'free' | 'pro' | 'agent'
  dailyLimit: number
  hasR1: boolean
}

// In production, these would be in a database
// For MVP, we use environment variables
const PRO_KEYS = new Set((process.env.PRO_API_KEYS || '').split(',').filter(Boolean))
const AGENT_KEYS = new Set((process.env.AGENT_API_KEYS || '').split(',').filter(Boolean))

// In-memory rate limiting (resets on deploy)
const rateLimits: Map<string, { count: number; resetAt: number }> = new Map()

const TIER_CONFIG: Record<string, ApiKeyConfig> = {
  free: { tier: 'free', dailyLimit: 5, hasR1: false },
  pro: { tier: 'pro', dailyLimit: 10000, hasR1: true },
  agent: { tier: 'agent', dailyLimit: 50000, hasR1: true },
}

export function validateApiKey(authHeader: string | null): {
  valid: boolean
  config: ApiKeyConfig
  key: string
  error?: string
} {
  // No auth = free tier
  if (!authHeader) {
    return { valid: true, config: TIER_CONFIG.free, key: 'anonymous' }
  }

  const key = authHeader.replace('Bearer ', '').trim()

  if (PRO_KEYS.has(key)) {
    return { valid: true, config: TIER_CONFIG.pro, key }
  }

  if (AGENT_KEYS.has(key)) {
    return { valid: true, config: TIER_CONFIG.agent, key }
  }

  // Unknown key = free tier (graceful degradation)
  return { valid: true, config: TIER_CONFIG.free, key }
}

export function checkRateLimit(key: string, limit: number): {
  allowed: boolean
  remaining: number
  resetAt: number
} {
  const now = Date.now()
  const dayMs = 24 * 60 * 60 * 1000
  const entry = rateLimits.get(key)

  if (!entry || now > entry.resetAt) {
    // New day, reset counter
    rateLimits.set(key, { count: 1, resetAt: now + dayMs })
    return { allowed: true, remaining: limit - 1, resetAt: now + dayMs }
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt }
}
