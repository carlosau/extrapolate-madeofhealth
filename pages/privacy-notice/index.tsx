import Layout from "@/components/layout";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyNotice() {
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
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-4 text-xl font-semibold">Privacy Notice</h1>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">1. Introduction</h2>
            <p>
              This Privacy Notice ("Notice") outlines how MadeofHealth ("we,"
              "our," or "us") collects, uses, and protects your personal data
              when you visit our website, madeofhealth.com ("Website"). We are
              committed to safeguarding your privacy and ensuring the security
              of your personal information.
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              2. Information We May Collect
            </h2>
            <p>We may collect various types of information, including:</p>
            <ul className="ml-6 list-disc">
              <li>
                <strong>Personal Information:</strong> This includes data such
                as your name, email address, and other information you provide
                voluntarily.
              </li>
              <li>
                <strong>Usage Data:</strong> We collect data about your
                interactions with our Website, such as your IP address, browser
                type, pages visited, and referring URLs.
              </li>
              <li>
                <strong>Media:</strong> Photos uploaded on the
                https://myskin.madeofhealth.com
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              3. How We Use Your Information
            </h2>
            <p>We use your information for the following purposes:</p>
            <ul className="ml-6 list-disc">
              <li>To provide and maintain our Website.</li>
              <li>
                To respond to your inquiries and provide customer support.
              </li>
              <li>
                To improve and personalize your experience on our Website.
              </li>
              <li>
                To send you updates, newsletters, and promotional materials (if
                you have consented to receive them).
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">4. Data Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent. We may share
              your data (except media type) with trusted service providers who
              assist us in operating our Website or conducting our business.
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">5. Data Removal</h2>
            <p>
              We are committed to ensuring the security and privacy of your
              data, including media (photos) uploaded on the
              https://myskin.madeofhealth.com. We send a request to
              delete the media data stored in our system to ensure it is no
              longer accessible. Additionally, we mark the data as "expired"
              in our records to indicate that it should not be used for any
              further processing. Please note that while we take these steps to
              remove your media data, it may still exist in backups or logs for
              a limited duration due to technical constraints. However, we do
              not use or share your media data once it is marked as "expired."
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">6. Data Security</h2>
            <p>
              We implement security measures to protect your personal
              information from unauthorized access, disclosure, alteration, or
              destruction.
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">7. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal
              information. You may also withdraw your consent for certain
              processing activities. To exercise these rights or raise concerns
              about your data, please contact us.
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">8. Cookies</h2>
            <p>
              For information about how we use cookies, please refer to our{" "}
              <u>
                <Link href="/cookies-policy">Cookies Policy</Link>
              </u>
              .
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">9. Changes to this Notice</h2>
            <p>
              We may update this Privacy Notice to reflect changes in our
              practices or for legal reasons. We will notify you of any
              significant changes by posting the updated Notice on our Website.
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">10. Contact Us</h2>
            <p>
              If you have questions or concerns about our Privacy Notice or data
              practices, please contact us at{" "}
              <u>
                <Link href="mailto:data@madeofhealth.com">
                  data@madeofhealth.com
                </Link>
              </u>
            </p>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
