import Layout from "@/components/layout";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CookiesPolicy() {
    return (
        <Layout>
      <motion.div
        className="z-10 max-w-2xl px-5 xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-xl font-semibold mb-4">Cookies Policy</h1>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">1. Introduction</h2>
            <p>
              This Cookies Policy ("Policy") describes how MadeofHealth ("we," "our," or "us") uses cookies and similar tracking technologies on our website, madeofhealth.com ("Website"). This Policy explains what cookies are, how we use them, and your choices regarding their use.
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">2. What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your computer or device when you visit our Website. They serve various purposes, including recognizing your preferences, improving user experience, and helping us analyze how our Website is used.
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">3. How We Use Cookies</h2>
            <p>
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc ml-6">
              <li>
                <strong>Essential Cookies:</strong> These cookies are necessary for the functioning of our Website. They enable core functionality, such as page navigation and access to secure areas.
              </li>
              <li>
                <strong>Analytical Cookies:</strong> We use analytical cookies to collect information about how visitors use our Website. This helps us improve the performance and content of our Website.
              </li>
              <li>
                <strong>Functional Cookies:</strong> Functional cookies allow us to remember choices you make on our Website, such as your language preferences and settings.
              </li>
              <li>
                <strong>Advertising Cookies:</strong> We may use advertising cookies to deliver relevant advertisements to you based on your interests and online behavior.
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">4. Your Cookie Choices</h2>
            <p>
              You have the option to manage your cookie preferences. Most web browsers allow you to control cookies through their settings. You can choose to accept or reject cookies and delete them when desired. Please note that blocking or deleting cookies may impact your experience on our Website.
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">5. Privacy Notice</h2>
            <p>
              For information about data collection, please review our <u><Link href="/privacy-notice">Privacy Notice</Link></u> .
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">6. Contact Us</h2>
            <p>
              If you have any questions or concerns about our use of cookies, please contact us at <u><Link href="mailto:data@madeofhealth.com">data@madeofhealth.com</Link></u>.
            </p>
          </div>
        </div>
      </motion.div>
    </Layout>
    )
    
}