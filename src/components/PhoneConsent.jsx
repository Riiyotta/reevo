// SMS consent line under the demo / startup-application forms. Legal pages live on reevo.ai.
export default function PhoneConsent() {
  return (
    <p className="text-xs text-muted-foreground">
      By providing your phone number, you consent to receive appointment reminder texts from Reevo. Message and data rates
      may apply. Message frequency may vary. Text HELP for more information or text STOP to opt out. View our{' '}
      <a className="underline" href="https://reevo.ai/privacy" target="_blank" rel="noopener noreferrer">
        Privacy Notice
      </a>{' '}
      and{' '}
      <a className="underline" href="https://reevo.ai/terms" target="_blank" rel="noopener noreferrer">
        Terms of Service
      </a>
      .
    </p>
  )
}
