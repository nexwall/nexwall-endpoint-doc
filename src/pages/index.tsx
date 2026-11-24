import type { ReactNode } from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import styles from './index.module.css'

const cards = [
  { to: '/docs/design/overview', title: 'Overview', text: 'What Nexwall Endpoint is and the principles behind it.' },
  { to: '/docs/design/architecture', title: 'Architecture', text: 'Layers, the process model on the endpoint and the main data flows, with diagrams.' },
  { to: '/docs/design/components', title: 'Components', text: 'The sensors, services and open-source building blocks, and why each was chosen.' },
  { to: '/docs/design/data-model', title: 'Data model', text: 'The event envelope and the Open Cybersecurity Schema Framework.' },
  { to: '/docs/design/identity-and-tenancy', title: 'Identity and tenancy', text: 'How an endpoint proves who it is and how tenants stay separated.' },
  { to: '/docs/design/response-and-firewall', title: 'Response and firewall', text: 'Isolating a device at the network edge together with Nexwall Firewall.' },
  { to: '/docs/design/security-and-licensing', title: 'Security and licensing', text: 'Tamper resistance, signed updates, licence discipline and attribution.' },
  { to: '/docs/design/status', title: 'Status', text: 'What is built and verified today, and what is planned.' }
]

export default function Home(): ReactNode {
  return (
    <Layout title="Nexwall Endpoint" description="Design and technology of Nexwall Endpoint">
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>Nexwall Endpoint</h1>
        <p className={styles.heroSubtitle}>
          Endpoint detection and response that works together with Nexwall Firewall. This site describes the design and the technology behind it.
        </p>
        <Link className="button button--secondary button--lg" to="/docs/design/overview">Read the design</Link>
      </header>
      <main className="container">
        <div className={styles.grid}>
          {cards.map((c) => (
            <Link key={c.to} to={c.to} className={styles.card}>
              <h2 className={styles.cardTitle}>{c.title}</h2>
              <p className={styles.cardText}>{c.text}</p>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  )
}
