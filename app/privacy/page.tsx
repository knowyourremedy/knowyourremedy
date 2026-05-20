import LegalPageLayout from '@/components/LegalPageLayout'

export const metadata = {
  title: 'Privacy Policy | KnowYourRemedy',
  description: 'Privacy Policy for KnowYourRemedy.com — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="May 19, 2026">

      <p>
        KnowYourRemedy.com (&ldquo;KnowYourRemedy,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This Privacy Policy explains what information we collect, how we use it, who we share it with, and the choices you have. By using our website, mobile applications, or any services we offer (collectively, the &ldquo;Services&rdquo;), you agree to the practices described in this Policy.
      </p>

      <h2>1. Information We Collect</h2>

      <h3>Information you provide to us</h3>
      <p>
        When you create an account, we collect:
      </p>
      <ul>
        <li>Email address</li>
        <li>Password (stored in encrypted form — we never see or store your actual password in readable form)</li>
        <li>Date of birth (used to verify you are 18 or older, or that you are an adult creating an account on behalf of a minor)</li>
        <li>Your agreement to our Terms of Service, including the version agreed to and the timestamp</li>
      </ul>
      <p>
        When you create a family profile, we collect:
      </p>
      <ul>
        <li>The name (or nickname) of the family member</li>
        <li>Their date of birth or age</li>
        <li>Their weight (used to calculate accurate dosing)</li>
        <li>Optional notes you choose to add</li>
      </ul>
      <p>
        When you log a dose, save a favorite remedy, or use other premium features, we collect:
      </p>
      <ul>
        <li>The medication, supplement, oil, or remedy you logged</li>
        <li>The dose amount and time</li>
        <li>Any notes you add to that log</li>
      </ul>

      <h3>Information collected automatically</h3>
      <p>
        When you use the Services, we automatically collect certain technical information:
      </p>
      <ul>
        <li>Device type, operating system, and browser</li>
        <li>IP address (used for security and general location, not stored long-term)</li>
        <li>Pages visited and features used (used to improve the Services)</li>
        <li>Approximate location based on IP (city/region only — never your exact location)</li>
      </ul>
      <p>
        We use cookies and similar technologies for authentication, security, and remembering your preferences. You can disable cookies in your browser settings, but some features of the Services may not work properly.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>
        We use the information we collect to:
      </p>
      <ul>
        <li>Provide, maintain, and improve the Services</li>
        <li>Calculate accurate doses for the people in your family profiles</li>
        <li>Send dose reminders, refill reminders, and other notifications you have enabled</li>
        <li>Authenticate your account and protect it from unauthorized access</li>
        <li>Communicate with you about updates, new features, and important changes to the Services or to these policies</li>
        <li>Comply with legal obligations and enforce our Terms of Service</li>
      </ul>

      <h2>3. Children&rsquo;s Privacy (COPPA Compliance)</h2>
      <p>
        KnowYourRemedy is not directed at children under 13 years of age, and we do not knowingly collect personal information directly from children under 13.
      </p>
      <p>
        <strong>Family profiles for minors are different.</strong> Parents and legal guardians may create family profiles for children of any age within their own adult account. In these cases:
      </p>
      <ul>
        <li>The information is provided by the parent or guardian, not by the child</li>
        <li>The parent or guardian is the account holder and controls all the data</li>
        <li>The parent or guardian may delete the child&rsquo;s profile at any time</li>
        <li>We do not market to minors and do not display advertising to family profiles</li>
      </ul>
      <p>
        If you believe a child has created their own account in violation of our Terms, please contact us at <a href="mailto:hello@knowyourremedy.com">hello@knowyourremedy.com</a> and we will promptly delete the account.
      </p>

      <h2>4. How We Share Your Information</h2>
      <p>
        <strong>We do not sell your personal information.</strong> We do not rent your information to advertisers. We do not share your individual health data, dose logs, or family profile information with third parties for marketing purposes.
      </p>
      <p>
        We share information only in the following limited circumstances:
      </p>
      <ul>
        <li><strong>Service providers:</strong> We use trusted third-party services to operate the Services, including Supabase (database and authentication), Vercel (hosting), and our email service provider. These providers process information only on our behalf and under strict confidentiality obligations.</li>
        <li><strong>Affiliate links:</strong> When you click an affiliate link on our Services (such as a link to iHerb, Amazon, Vitacost, Thrive Market, or Plant Therapy), the destination retailer collects its own information according to its own privacy policy. We do not share your account information with these retailers.</li>
        <li><strong>Caregiver sharing (premium feature):</strong> If you choose to share a family profile with a caregiver, that caregiver will see the information you explicitly share. This sharing is at your direction and can be revoked at any time.</li>
        <li><strong>Legal compliance:</strong> We may disclose information if required by law, subpoena, or court order, or if we believe disclosure is necessary to protect the rights, property, or safety of KnowYourRemedy, our users, or the public.</li>
        <li><strong>Business transfers:</strong> If KnowYourRemedy is acquired, merged, or sells assets, your information may be transferred as part of that transaction. We will notify you before this happens.</li>
      </ul>

      <h2>5. Data Security</h2>
      <p>
        We use industry-standard security measures to protect your information, including:
      </p>
      <ul>
        <li>Encrypted password storage (we never store passwords in readable form)</li>
        <li>Encrypted connections (HTTPS) on every page of the Services</li>
        <li>Row-level security on all database tables — users can only access their own data</li>
        <li>Regular security audits of our infrastructure</li>
      </ul>
      <p>
        However, no system is 100% secure. We cannot guarantee absolute security of your information.
      </p>

      <h2>6. Your Rights and Choices</h2>
      <p>
        You have the following rights regarding your information:
      </p>
      <ul>
        <li><strong>Access:</strong> View all the information we have associated with your account by visiting your account page</li>
        <li><strong>Update:</strong> Correct or update any information at any time</li>
        <li><strong>Delete:</strong> Delete your account and all associated data at any time from your account page, or by emailing us</li>
        <li><strong>Export:</strong> Request a copy of your data in a portable format</li>
        <li><strong>Opt out of marketing:</strong> Unsubscribe from any marketing email using the link at the bottom of the email</li>
      </ul>
      <p>
        Residents of California, Colorado, Connecticut, Utah, Virginia, and other states with comprehensive privacy laws have additional rights under those laws, including the right to know what information is collected and to opt out of certain processing. To exercise these rights, email us at <a href="mailto:hello@knowyourremedy.com">hello@knowyourremedy.com</a>.
      </p>

      <h2>7. Data Retention</h2>
      <p>
        We retain your account information for as long as your account is active. If you delete your account, we permanently delete your personal information within 30 days, except where retention is required by law or for legitimate business purposes (such as fraud prevention or financial records).
      </p>
      <p>
        Dose logs and family profile information are deleted along with the account.
      </p>

      <h2>8. International Users</h2>
      <p>
        KnowYourRemedy is operated from the United States. If you access the Services from outside the United States, you understand that your information will be transferred to, stored, and processed in the United States, which may have different data protection laws than your country.
      </p>

      <h2>9. Third-Party Links</h2>
      <p>
        The Services contain links to third-party websites, including affiliate retailers. We are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies before providing any information.
      </p>

      <h2>10. Changes to This Privacy Policy</h2>
      <p>
        We may update this Policy from time to time. The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent revision. Material changes will be communicated to registered users by email and through a notice on the Services. Continued use of the Services after an update constitutes acceptance of the revised Policy.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        Questions about this Privacy Policy or about your personal information? Email us at <a href="mailto:hello@knowyourremedy.com">hello@knowyourremedy.com</a>.
      </p>

    </LegalPageLayout>
  )
}