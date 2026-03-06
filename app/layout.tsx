import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OpenClaw Intel Pro | AI Developer Intelligence, Powered by R1',
  description: 'The only intelligence service built for the AI agent economy. Real-time MCP ecosystem analysis for humans and AI agents. Powered by DeepSeek R1.',
  keywords: ['MCP', 'AI intelligence', 'developer tools', 'agent economy', 'DeepSeek R1', 'API'],
  openGraph: {
    title: 'OpenClaw Intel Pro',
    description: 'AI Developer Intelligence, Powered by R1',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-['Inter',sans-serif] antialiased">
        {children}
      </body>
    </html>
  )
}
