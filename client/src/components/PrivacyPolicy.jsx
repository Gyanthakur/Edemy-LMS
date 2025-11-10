
import { assets } from '../assets/assets';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-cyan-100/70 to-white flex items-start py-16 px-6 md:px-12">
      <section className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-12 border border-gray-100">
        <header className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <img src={assets.logo || assets.sketch} alt="Edemy logo" className="w-12 h-12 md:w-14 md:h-14 rounded-md" />

          <div className="flex-1">
            <h1 className="md:text-home-heading-large text-home-heading-small font-extrabold text-gray-800 leading-tight">Privacy Policy</h1>
            <p className="mt-1 text-sm text-gray-500">Effective date: <span className="text-gray-700 font-medium">November 10, 2025</span></p>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <a href="mailto:gps.96169@gmail.com" className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white shadow-sm hover:shadow-lg transition">Contact</a>
            <button className="px-4 py-2 rounded-xl border border-blue-100 text-sm font-medium bg-white text-blue-600">Manage Cookies</button>
          </div>
        </header>

        <div className="mt-8 space-y-6 text-gray-700">
          <p className="text-base">Edemy LMS (<span className="font-semibold">"we"</span>, <span className="font-semibold">"us"</span>, or <span className="font-semibold">"our"</span>) cares about your privacy. This policy explains what information we collect, why we collect it, and how you can manage it. We kept the language simple and aligned styles with the Hero section for visual consistency.</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
              <h3 className="font-semibold text-gray-800">Information We Collect</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li><strong>Account:</strong> name, email, password, profile details</li>
                <li><strong>Payments:</strong> billing handled by third-party processors</li>
                <li><strong>Course data:</strong> progress, quiz results, uploads</li>
                <li><strong>Device & analytics:</strong> IP, device info, cookies</li>
              </ul>
            </div>

            <div className="p-4 bg-cyan-50/70 rounded-xl border border-cyan-100">
              <h3 className="font-semibold text-gray-800">How We Use Data</h3>
              <p className="mt-3 text-sm text-gray-600">To operate the platform, process enrollments and payments, personalize learning paths, provide support, secure accounts, and improve features. Marketing emails are sent only with consent and can be opted out anytime.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-gray-100 bg-white">
            <h3 className="font-semibold text-gray-800">Sharing & Third Parties</h3>
            <p className="mt-2 text-sm text-gray-600">We work with trusted service providers (hosting, payments, analytics, email). Contracts require them to protect data. We do not sell personal information. We may disclose data to comply with legal obligations or to protect rights.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl border border-gray-100 bg-white">
              <h3 className="font-semibold text-gray-800">Cookies & Tracking</h3>
              <p className="mt-2 text-sm text-gray-600">We use cookies and similar technologies to remember preferences and measure usage. Control cookies via browser settings — turning them off may reduce functionality.</p>
            </div>

            <div className="p-4 rounded-xl border border-gray-100 bg-white">
              <h3 className="font-semibold text-gray-800">Security</h3>
              <p className="mt-2 text-sm text-gray-600">We implement reasonable administrative, technical, and physical safeguards. However, no transmission over the internet is 100% secure — protect your credentials and notify us of any suspicious activity.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-gray-100 bg-white">
            <h3 className="font-semibold text-gray-800">Your Rights</h3>
            <p className="mt-2 text-sm text-gray-600">Depending on your jurisdiction, you may access, correct, export, or delete your personal data. Contact us to exercise these rights and we’ll respond per applicable law.</p>
          </div>

          <div className="p-4 rounded-xl border border-gray-100 bg-white">
            <h3 className="font-semibold text-gray-800">Children</h3>
            <p className="mt-2 text-sm text-gray-600">Our services are not intended for children under 13. We don’t knowingly collect data from children under 13 — if discovered, we’ll promptly remove it.</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-gray-600">Last updated: <span className="font-medium text-gray-700">November 10, 2025</span></p>

            <div className="md:hidden flex items-center gap-3">
              <a href="mailto:gps.96169@gmail.com" className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white shadow-sm hover:shadow-lg transition">Contact</a>
              <button className="px-4 py-2 rounded-xl border border-blue-100 text-sm font-medium bg-white text-blue-600">Manage Cookies</button>
            </div>
          </div>

          <hr className="border-t border-gray-100" />

          <div className="flex items-start gap-4">
            <img src={assets.sketch} alt="decoration" className="w-20 h-20 hidden md:block opacity-90" />
            <div className="text-sm text-gray-600">
              <p className="mb-2">For privacy requests or questions, email us at <a href="mailto:gps.96169@gmail.com" className="text-blue-600 font-medium">gps.96169@gmail.com</a>.</p>
              <p>If you need this policy in another format, contact support and we’ll help.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
