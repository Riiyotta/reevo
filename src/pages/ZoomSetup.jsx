import DocPage from '../components/blog/DocPage.jsx'

export default function ZoomSetup() {
  return (
    <main>
      <DocPage title="Connect Reevo to Zoom">
        <h2>How to connect Zoom</h2>
        <ol>
          <li>Log in to Reevo</li>
          <li>
            Go to <strong>Settings → Integrations</strong>
          </li>
          <li>
            Click <strong>Connect</strong> on Zoom
          </li>
          <li>Log in to Zoom and authorize the Reevo app</li>
          <li>That's it! You can now use the Reevo app in Zoom meetings</li>
        </ol>
        <h2>How to disconnect Zoom</h2>
        <ol>
          <li>Log in to Reevo</li>
          <li>
            Go to <strong>Settings → Integrations</strong>
          </li>
          <li>
            Click <strong>Disconnect</strong> on Zoom
          </li>
        </ol>
      </DocPage>
    </main>
  )
}
