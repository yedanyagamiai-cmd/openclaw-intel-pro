export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-claw-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">OC</div>
            <span className="font-semibold text-lg">Intel Pro</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-400 hover:text-white transition">Features</a>
            <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition">Pricing</a>
            <a href="#api" className="text-sm text-gray-400 hover:text-white transition">API</a>
            <a href="/api/v1/trending" className="text-sm text-gray-400 hover:text-white transition">Live Demo</a>
            <a href="#pricing" className="px-4 py-2 bg-claw-600 hover:bg-claw-500 rounded-lg text-sm font-medium transition">Get API Key</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.08),transparent_60%)]" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-claw-500/5 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-claw-500/30 bg-claw-500/5 text-claw-400 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Monitoring 11,000+ MCP Servers in Real-Time
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            <span className="gradient-text">AI Developer</span>
            <br />
            Intelligence
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The first intelligence service built for the AI agent economy.
            Deep analysis powered by DeepSeek R1 — not search results, <span className="text-white font-medium">actual reasoning</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href="#pricing" className="px-8 py-3.5 bg-gradient-to-r from-claw-600 to-claw-500 hover:from-claw-500 hover:to-claw-400 rounded-xl text-white font-semibold transition-all shadow-lg shadow-claw-500/20 hover:shadow-claw-500/40">
              Get API Key — $19/mo
            </a>
            <a href="/api/v1/trending" className="px-8 py-3.5 border border-white/10 hover:border-white/20 rounded-xl text-gray-300 font-medium transition-all hover:bg-white/5">
              Try Free Tier
            </a>
          </div>

          {/* Live query demo */}
          <div className="max-w-2xl mx-auto">
            <div className="code-block text-left">
              <div className="text-gray-500 mb-2">// Query the MCP ecosystem with natural language</div>
              <div>
                <span className="keyword">curl</span> -X POST https://intel.openclaw.ai/api/v1/query \{'\n'}
                {'  '}-H <span className="string">&quot;Authorization: Bearer YOUR_API_KEY&quot;</span> \{'\n'}
                {'  '}-d <span className="string">&apos;{'{'}&quot;query&quot;: &quot;What MCP servers are trending this week and why?&quot;{'}'}&apos;</span>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5">
                <span className="comment">// Response: R1-powered deep analysis with reasoning</span>{'\n'}
                {'{'}{'\n'}
                {'  '}<span className="property">&quot;analysis&quot;</span>: <span className="string">&quot;Context7 leads with 11K views due to...&quot;</span>,{'\n'}
                {'  '}<span className="property">&quot;reasoning&quot;</span>: <span className="string">&quot;&lt;think&gt;Analyzing adoption patterns...&lt;/think&gt;&quot;</span>,{'\n'}
                {'  '}<span className="property">&quot;data&quot;</span>: {'{'} <span className="property">&quot;servers_analyzed&quot;</span>: <span className="value">847</span>, <span className="property">&quot;trends&quot;</span>: [...] {'}'}{'\n'}
                {'}'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/5 bg-[#111118]">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '11,000+', label: 'MCP Servers Tracked' },
            { value: 'R1', label: 'DeepSeek Reasoning' },
            { value: '<2s', label: 'Average Response' },
            { value: '99.9%', label: 'API Uptime' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Intelligence for <span className="gradient-text">Humans & AI Agents</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              One API that serves both human developers and autonomous AI agents.
              REST for humans, MCP-native for agents.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🧠',
                title: 'R1-Powered Analysis',
                desc: 'DeepSeek R1 reasoning engine analyzes trends, not just returns search results. See the thinking process behind every insight.',
              },
              {
                icon: '⚡',
                title: 'Real-Time Monitoring',
                desc: 'Live tracking across Smithery, npm, GitHub, and 6+ MCP directories. Know what\'s trending before everyone else.',
              },
              {
                icon: '🤖',
                title: 'Dual-Market Native',
                desc: 'REST API for human dashboards. MCP endpoint for AI agents. Both get the same premium intelligence.',
              },
              {
                icon: '📊',
                title: 'Revenue Intelligence',
                desc: 'Which MCP niches are monetizable? What\'s the pricing sweet spot? Data-driven revenue opportunities.',
              },
              {
                icon: '🎯',
                title: 'Competitive Analysis',
                desc: 'Compare any MCP server against competitors. Feature gaps, adoption curves, pricing analysis.',
              },
              {
                icon: '🔐',
                title: 'API Key Auth',
                desc: 'Simple bearer token authentication. Works with any HTTP client, any programming language, any AI framework.',
              },
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-xl border border-white/5 bg-[#111118] card-hover">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Section */}
      <section id="api" className="py-24 px-6 bg-[#111118]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Powerful <span className="gradient-text">API</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Three endpoints. One API key. Infinite intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                method: 'GET',
                path: '/api/v1/trending',
                desc: 'Real-time trending MCP servers, frameworks, and tools',
                free: true,
              },
              {
                method: 'POST',
                path: '/api/v1/query',
                desc: 'Natural language intelligence queries with R1 analysis',
                free: false,
              },
              {
                method: 'POST',
                path: '/api/v1/analyze',
                desc: 'Deep competitive analysis of any MCP server or tool',
                free: false,
              },
            ].map((endpoint) => (
              <div key={endpoint.path} className="p-6 rounded-xl border border-white/5 bg-[#0a0a0f] card-hover">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                    endpoint.method === 'GET' ? 'bg-green-500/10 text-green-400' : 'bg-claw-500/10 text-claw-400'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-sm text-gray-300">{endpoint.path}</code>
                </div>
                <p className="text-sm text-gray-400">{endpoint.desc}</p>
                <div className="mt-3">
                  {endpoint.free ? (
                    <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded">Free Tier</span>
                  ) : (
                    <span className="text-xs text-claw-400 bg-claw-400/10 px-2 py-0.5 rounded">Pro Required</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for the <span className="gradient-text">Agent Economy</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl border border-claw-500/20 bg-gradient-to-br from-claw-500/5 to-transparent">
              <div className="text-2xl mb-3">👨‍💻 For Human Developers</div>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2"><span className="text-claw-400 mt-1">&#x2713;</span> &quot;What MCP servers should I build next?&quot;</li>
                <li className="flex items-start gap-2"><span className="text-claw-400 mt-1">&#x2713;</span> &quot;Show me the revenue potential for a database MCP&quot;</li>
                <li className="flex items-start gap-2"><span className="text-claw-400 mt-1">&#x2713;</span> &quot;Compare my server against top competitors&quot;</li>
                <li className="flex items-start gap-2"><span className="text-claw-400 mt-1">&#x2713;</span> &quot;What are enterprises paying for AI tools?&quot;</li>
              </ul>
            </div>

            <div className="p-8 rounded-xl border border-accent-500/20 bg-gradient-to-br from-accent-500/5 to-transparent">
              <div className="text-2xl mb-3">🤖 For AI Agents</div>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2"><span className="text-accent-400 mt-1">&#x2713;</span> Autonomous market research via MCP</li>
                <li className="flex items-start gap-2"><span className="text-accent-400 mt-1">&#x2713;</span> Per-query pricing ($0.05/query)</li>
                <li className="flex items-start gap-2"><span className="text-accent-400 mt-1">&#x2713;</span> Structured JSON responses for programmatic use</li>
                <li className="flex items-start gap-2"><span className="text-accent-400 mt-1">&#x2713;</span> Real-time data feeds for agent decision-making</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-[#111118]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-gray-400">Start free. Scale when you need to.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Free */}
            <div className="p-8 rounded-xl border border-white/5 bg-[#0a0a0f]">
              <h3 className="text-xl font-bold mb-2">Explorer</h3>
              <div className="text-4xl font-extrabold mb-1">$0</div>
              <div className="text-sm text-gray-500 mb-6">forever</div>
              <ul className="space-y-3 text-sm text-gray-400 mb-8">
                <li>&#x2713; 5 queries/day</li>
                <li>&#x2713; Trending data</li>
                <li>&#x2713; Basic analysis</li>
                <li className="text-gray-600">&#x2717; R1 deep reasoning</li>
                <li className="text-gray-600">&#x2717; Competitive analysis</li>
              </ul>
              <a href="/api/v1/trending" className="block text-center px-6 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition">
                Try Now
              </a>
            </div>

            {/* Pro */}
            <div className="p-8 rounded-xl border border-claw-500/30 bg-[#0a0a0f] glow-border relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-claw-600 rounded-full text-xs font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <div className="text-4xl font-extrabold mb-1">$19<span className="text-lg text-gray-500">/mo</span></div>
              <div className="text-sm text-gray-500 mb-6">or $79/year (save 65%)</div>
              <ul className="space-y-3 text-sm text-gray-400 mb-8">
                <li>&#x2713; Unlimited queries</li>
                <li>&#x2713; R1 deep reasoning</li>
                <li>&#x2713; Competitive analysis</li>
                <li>&#x2713; Revenue intelligence</li>
                <li>&#x2713; Priority support</li>
              </ul>
              <a href="https://buy.stripe.com/test_PLACEHOLDER_PRO" className="block text-center px-6 py-3 bg-gradient-to-r from-claw-600 to-claw-500 rounded-lg font-semibold hover:from-claw-500 hover:to-claw-400 transition shadow-lg shadow-claw-500/20">
                Get API Key
              </a>
            </div>

            {/* Agent */}
            <div className="p-8 rounded-xl border border-accent-500/20 bg-[#0a0a0f]">
              <h3 className="text-xl font-bold mb-2">Agent</h3>
              <div className="text-4xl font-extrabold mb-1">$0.05<span className="text-lg text-gray-500">/query</span></div>
              <div className="text-sm text-gray-500 mb-6">pay as you go</div>
              <ul className="space-y-3 text-sm text-gray-400 mb-8">
                <li>&#x2713; Per-query pricing</li>
                <li>&#x2713; MCP-native endpoint</li>
                <li>&#x2713; R1 deep reasoning</li>
                <li>&#x2713; Structured JSON</li>
                <li>&#x2713; Bulk discounts</li>
              </ul>
              <a href="https://buy.stripe.com/test_PLACEHOLDER_AGENT" className="block text-center px-6 py-3 border border-accent-500/30 rounded-lg hover:bg-accent-500/5 transition">
                Get Agent Key
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(14,165,233,0.08),transparent_60%)]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stop guessing. Start <span className="gradient-text">knowing</span>.
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            The AI agent economy is $7.8B and growing 46% yearly.
            Get the intelligence you need to capture your share.
          </p>
          <a href="#pricing" className="inline-block px-10 py-4 bg-gradient-to-r from-claw-600 to-accent-500 rounded-xl text-lg font-bold shadow-lg shadow-claw-500/20 hover:shadow-claw-500/40 transition-all">
            Get Started Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-claw-500 to-accent-500 flex items-center justify-center text-white font-bold text-xs">OC</div>
            <span className="text-sm text-gray-400">OpenClaw Intel Pro</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="https://github.com/openclaw-ai" className="hover:text-white transition">GitHub</a>
            <a href="https://moltbook.com/s/openclaw" className="hover:text-white transition">MoltBook</a>
            <a href="mailto:yedanyagamiai@gmail.com" className="hover:text-white transition">Contact</a>
          </div>
          <div className="text-xs text-gray-600">
            Powered by DeepSeek R1 via DeepInfra
          </div>
        </div>
      </footer>
    </main>
  )
}
