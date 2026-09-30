import DocPage from '../components/blog/DocPage.jsx'

export default function BotForSlackSetup() {
  return (
    <main>
      <DocPage title="Reevo Bot for Slack">
        <p>
          Reevo Bot for Slack brings your CRM data directly into your team conversations. Ask questions about contacts,
          deals, and accounts using natural language, and get instant answers without leaving Slack.
        </p>
        <ul>
          <li>Tag @Reevo in any message to ask questions about your sales data</li>
          <li>Ask in plain English like "What deals are closing this week?"</li>
          <li>Follow-up questions in threads remember your previous conversation</li>
          <li>Only shows data you have access to in your Reevo account</li>
          <li>Use in team channels or private direct messages</li>
        </ul>
        <h2>Installation Requirements</h2>
        <ul>
          <li>Active Slack Workspace</li>
          <li>Slack Workspace Admin</li>
          <li>Active Reevo Account</li>
          <li>Reevo Account Admin</li>
        </ul>
        <h2>Add the @Reevo Bot for Slack</h2>
        <ol>
          <li>Log in to Reevo</li>
          <li>
            Go to <strong>Settings → Integrations</strong>
          </li>
          <li>Click Connect on Reevo Bot for Slack</li>
          <li>Log in to your Slack Workspace and authorize the Reevo app</li>
          <li>That's it! You can now use the @Reevo by inviting the bot to your Slack channels.</li>
        </ol>
        <h2>Features</h2>
        <h3>Natural Language Queries</h3>
        <p>
          Ask questions about your Reevo data in plain English. "Show me all contacts from last week" or "What
          opportunities are closing this month?"
        </p>
        <h3>Contact Management</h3>
        <p>
          Search, create, and update contacts directly from Slack. Add contact information, contact notes, and
          interactions seamlessly.
        </p>
        <h3>Account Management</h3>
        <p>
          Search, create, and update accounts directly from Slack. Have company information available immediately from
          Slack.
        </p>
        <h3>Opportunity Tracking</h3>
        <p>
          Monitor deal progress, update opportunity stages, and get smart insights on your sales pipeline without leaving
          your Slack channel.
        </p>
        <h2>Interaction Details</h2>
        <h3>How to use the Reevo Bot for Slack</h3>
        <ul>
          <li>
            <strong>Invite the Bot:</strong>
            <ul>
              <li>Type '/invite @Reevo' in channels where you want to use it</li>
            </ul>
          </li>
          <li>
            <strong>Connect your account:</strong>
            <ul>
              <li>
                Each team member must authorize their Reevo account. Unauthorized users get a prompt to sign in to reevo.ai
                and connect when mentioning @Reevo.
              </li>
            </ul>
          </li>
          <li>
            <strong>Start asking:</strong>
            <ul>
              <li>
                Type <code>@Reevo</code> followed by your question (e.g., "@Reevo show me deals closing this month")
              </li>
            </ul>
          </li>
        </ul>
        <h3>What Triggers the Reevo Bot for Slack</h3>
        <ul>
          <li>
            <strong>@mentions:</strong> Any message with <code>@Reevo</code> in channels or direct messages
          </li>
          <li>
            <strong>Thread replies:</strong> Follow-up questions in existing bot conversations
          </li>
          <li>
            <strong>Direct Messages:</strong> Any message sent directly to the @Reevo bot
          </li>
        </ul>
        <h3>Channel Setup</h3>
        <ul>
          <li>
            The bot only works in channels where it's been invited using <code>/invite @Reevo</code>
          </li>
          <li>Works best in channels connected to your Reevo sales pipelines</li>
          <li>Regular team chat continues normally - bot only responds to @mentions</li>
        </ul>
        <h2>Technology Disclosure</h2>
        <p>
          This application uses artificial intelligence to process and interpret natural language queries related to your
          business data. The technology helps translate your requests into database operations and provides intelligent
          responses based on your Reevo information.
        </p>
        <p>
          <strong>Disclaimer:</strong> As with any product that utilizes generative AI technology, there is potential that
          inaccurate responses can be generated.
        </p>
        <h3>What our technology does:</h3>
        <ul>
          <li>Processes natural language queries to understand your intent</li>
          <li>Translates requests into appropriate business operations</li>
          <li>Provides contextual responses based on your data</li>
          <li>Suggests relevant actions and insights</li>
        </ul>
        <h2>Privacy Notice</h2>
        <ul>
          <li>
            <a href="https://reevo.ai/privacy" target="_blank" rel="noopener noreferrer">https://reevo.ai/privacy</a>
          </li>
          <li>
            Data Deletion notes from the above Privacy Notice link:
            <ul>
              <li>
                <strong>Opt-Out of the Sale of Leads Data.</strong> In accordance with applicable law, you may have the
                right to opt out of our sale of your Leads Data to third parties. To exercise this right, please email
                support@reevo.ai. We will process requests in accordance with applicable law.
              </li>
              <li>
                <strong>Account Deletion.</strong> You have an option to delete your entire account record, along with all
                associated personal information. You can do so within your Reevo App account settings. However, you won't
                be able to delete information, including personal information, that we are legally required to maintain.
              </li>
            </ul>
          </li>
        </ul>
      </DocPage>
    </main>
  )
}
