import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Elomaze" },
      { name: "description", content: "Elomaze privacy policy. How we protect your data." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 pb-24 lg:pb-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-8">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: April 2026</p>

      <div className="prose-sm space-y-8">
        {[
          {
            title: "1. Information We Collect",
            content: "We collect information you provide directly to us, such as when you create an account, list a property, contact an agent, or communicate with us. This includes your name, email address, phone number, and any other information you choose to provide."
          },
          {
            title: "2. How We Use Your Information",
            content: "We use the information we collect to provide, maintain, and improve our services, to process transactions, to send you notifications and updates, and to communicate with you about properties and services that may interest you."
          },
          {
            title: "3. Information Sharing",
            content: "We do not sell or share your personal information with third parties for their marketing purposes. We may share information with property agents when you express interest in a listing, and with service providers who assist us in operating our platform."
          },
          {
            title: "4. Data Security",
            content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
          },
          {
            title: "5. Your Rights",
            content: "You have the right to access, correct, or delete your personal information. You can update your account information at any time through your profile settings or by contacting us directly."
          },
          {
            title: "6. Contact Us",
            content: "If you have any questions about this Privacy Policy, please contact us at privacy@elomaze.com or through our contact page."
          },
        ].map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-semibold text-foreground mb-3">{section.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
