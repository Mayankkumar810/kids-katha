import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEO } from '../components/common/SEO';
import { ShieldCheck, FileText, AlertCircle } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'disclaimer';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const getDetails = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Privacy Policy (गोपनीयता नीति)',
          desc: 'Our commitment to protecting your privacy and providing a safe digital space for children and parents.',
          icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
          seoTitle: 'Privacy Policy - KathaVichar Kids Story Platform'
        };
      case 'terms':
        return {
          title: 'Terms of Service (नियम और शर्तें)',
          desc: 'The guidelines governing your use of the KathaVichar website, stories, and educational resources.',
          icon: <FileText className="w-6 h-6 text-indigo-500" />,
          seoTitle: 'Terms of Service - KathaVichar'
        };
      case 'disclaimer':
        return {
          title: 'Disclaimer & AdSense Policy (अस्वीकरण)',
          desc: 'Disclaimers regarding fictional folk tales, educational morals, and advertising transparency.',
          icon: <AlertCircle className="w-6 h-6 text-amber-500" />,
          seoTitle: 'Disclaimer & Advertising Policy - KathaVichar'
        };
    }
  };

  const details = getDetails();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 max-w-4xl space-y-6">
      <SEO title={details.seoTitle} description={details.desc} />

      <Breadcrumbs items={[{ label: details.title }]} />

      <div className="rounded-3xl bg-white p-6 sm:p-10 border border-slate-200/80 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5 dark:border-slate-800">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
            {details.icon}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">
              {details.title}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Last updated: September 2026 • KathaVichar Editorial Standards
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="mt-6 prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-5">
          {type === 'privacy' && (
            <>
              <section className="space-y-2">
                <h2 className="text-base font-bold text-slate-800 dark:text-white">1. Introduction & Child-Safe Commitment</h2>
                <p>
                  At KathaVichar (accessible at kathavichar.com), one of our core priorities is the privacy of our visitors, especially children and parents enjoying our multilingual stories. This Privacy Policy document outlines the types of information collected and how we use it safely.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-slate-800 dark:text-white">2. Google AdSense & Third-Party Cookies Policy</h2>
                <p>
                  Google is one of our third-party vendors. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.
                </p>
                <p>
                  Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on KathaVichar. They automatically receive your IP address when this occurs. KathaVichar has no access to or control over these cookies used by third-party advertisers.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-slate-800 dark:text-white">3. Children's Online Privacy Protection (COPPA)</h2>
                <p>
                  We prioritize protecting children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online reading activity. KathaVichar does not knowingly collect any Personal Identifiable Information from children under the age of 13.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-slate-800 dark:text-white">4. Local Storage and Preferences</h2>
                <p>
                  To make reading enjoyable, we store your dark mode preference, font size, reading bookmarks, and continue-reading progress locally on your device using HTML5 LocalStorage. None of this data is sold or transmitted to third parties.
                </p>
              </section>
            </>
          )}

          {type === 'terms' && (
            <>
              <section className="space-y-2">
                <h2 className="text-base font-bold text-slate-800 dark:text-white">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using KathaVichar, you accept and agree to be bound by the terms and provisions of this agreement. These terms apply to all visitors, readers, and educators.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-slate-800 dark:text-white">2. Educational & Family Purpose</h2>
                <p>
                  All stories, translations, audio narrations, and moral summaries provided on KathaVichar are curated for educational, literary, and bedtime enrichment purposes for children and families.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-slate-800 dark:text-white">3. Intellectual Property & Fair Use</h2>
                <p>
                  Classic folklore including Panchatantra, Jataka tales, and Akbar-Birbal legends are part of historic cultural folklore. Original translations, character adaptations, and creative retellings on this platform are protected under creative copyright. You are free to share stories with proper attribution to KathaVichar.
                </p>
              </section>
            </>
          )}

          {type === 'disclaimer' && (
            <>
              <section className="space-y-2">
                <h2 className="text-base font-bold text-slate-800 dark:text-white">1. Folklore & Moral Narratives Disclaimer</h2>
                <p>
                  The stories featured on KathaVichar are works of ancient folklore, fantasy, and creative fable writing. Characters such as talking lions, wise squirrels, and magical clouds are metaphorical devices used to convey timeless human virtues including truthfulness, empathy, courage, and perseverance.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-slate-800 dark:text-white">2. Google AdSense Compliance Statement</h2>
                <p>
                  KathaVichar complies with all Google AdSense publisher policies:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>No deceptive or misleading ad placement; ads are clearly demarcated with "Advertisement" labels.</li>
                  <li>No encouragement of accidental clicks or artificial inflation of impressions.</li>
                  <li>Strict family-safe advertising filters enforced for child and teen audience protection.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-slate-800 dark:text-white">3. Contact Us</h2>
                <p>
                  If you have any questions or feedback regarding our policies or stories, please contact our editorial desk at <strong className="text-amber-600">contact@kathavichar.com</strong>.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
