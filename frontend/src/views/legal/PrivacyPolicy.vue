<template>
  <div class="legal-content">
    <div class="legal-title">
      <h1>Privacy Policy</h1>
      <p class="dark:text-slate-400 text-slate-600">Updated at 2023-04-11</p>
    </div>
    <div class="legal-wrapper mt-[32px]">
      <div
        class="shadow-top transition ease shadow-scrollshtop dark:shadow-scrollshtopdark"
        :class="{ visible: isScrolledTop, '!w-[100vw]': isMobileDevice }"
      ></div>
      <div
        class="overflow-y-auto w-[100vw] flex justify-center"
        ref="tableContainer"
        @scroll="handleScrollShadow"
      >
        <div class="legal-items">
          <p>
            This Privacy Policy (the "Policy") describes the types of
            information that InsiderHive ("we", "us", "our") collects from you
            when you use insiderhive.com (the "Website") and how we use,
            maintain, protect, and disclose that information. By using the
            Website, you agree to the collection and use of your information in
            accordance with this Policy. If you do not agree with this Policy,
            please do not use the Website.
          </p>
          <ol>
            <li>
              <h2>Information We Collect</h2>
              <p>
                We collect Non-Personal Information from users of the Website.
                Non-Personal Information refers to information that cannot be
                used to identify you personally, such as your IP address,
                browser type, operating system, the pages you visit on the
                Website, and the time and date of your visit.
              </p>
            </li>
            <li>
              <h2>How We Use Your Information</h2>
              <p>
                We use the information we collect for various purposes,
                including:
              </p>
              <ul>
                <li>
                  To provide, maintain, and improve the Website and our
                  services.
                </li>
                <li>To personalize your experience on the Website.</li>
                <li>To protect the security and integrity of the Website.</li>
                <li>
                  To comply with legal obligations and enforce our terms and
                  conditions.
                </li>
              </ul>
            </li>
            <li>
              <h2>Security of Your Information</h2>
              <p>
                We implement reasonable security measures to protect your
                Non-Personal Information from unauthorized access, disclosure,
                or destruction. However, no method of transmission over the
                Internet or method of electronic storage is 100% secure, and we
                cannot guarantee the absolute security of your Non-Personal
                Information.
              </p>
            </li>
            <li>
              <h2>Cookies</h2>
              <p>
                We use cookies and similar technologies to enhance your
                experience on the Website, analyze how our site is used, and for
                other purposes as described in this Policy. You can control
                cookies through your browser settings, but please note that
                disabling cookies may affect the functionality of certain
                features on the Website.
              </p>
            </li>
            <li>
              <h2>Third-Party Websites</h2>
              <p>
                The Website may contain links to other websites that are not
                operated by us. We have no control over, and assume no
                responsibility for, the content, privacy policies, or practices
                of any third-party websites. We encourage you to review the
                privacy policies of any third-party websites you visit.
              </p>
            </li>
            <li>
              <h2>Children's Privacy</h2>
              <p>
                Our Website and services are not intended for children under the
                age of 13, and we do not knowingly collect Personal Information
                from children under the age of 13. If we become aware that we
                have collected Personal Information from a child under 13, we
                will take steps to delete that information as soon as possible.
              </p>
            </li>
            <li>
              <h2>Changes to This Policy</h2>
              <p>
                We reserve the right to update or modify this Policy at any time
                without prior notice. Any changes to this Policy will be posted
                on this page, and your continued use of the Website following
                the posting of any changes constitutes your acceptance of the
                revised Policy. We encourage you to periodically review this
                Policy to stay informed about its terms and conditions.
              </p>
            </li>
          </ol>
          <p class="py-[48px]">
            If you have any questions or concerns about this Policy, please
            contact us at
            <a
              target="_blank"
              href="/cdn-cgi/l/email-protection"
              class="__cf_email__"
              data-cfemail="89e0e7efe6c9e0e7fae0edecfbe1e0ffeca7eae6e4"
              >info@insiderhive.com</a
            >.
          </p>
        </div>
      </div>
      <div
        class="shadow-bottom transition ease shadow-scrollshbot dark:shadow-scrollshbotdark"
        :class="{ visible: isScrolledBottom }"
      ></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const tableContainer = ref(null);
    const isScrolledTop = ref(false);
    const isScrolledBottom = ref(true);

    const checkScrollPosition = () => {
      const { scrollTop, scrollHeight, clientHeight } = tableContainer.value;

      isScrolledTop.value = scrollTop > 0;
      isScrolledBottom.value = scrollTop + clientHeight <= scrollHeight;
    };

    const handleScrollShadow = () => {
      checkScrollPosition();
    };

    return {
      tableContainer,
      handleScrollShadow,
      isScrolledTop,
      isScrolledBottom,
    };
  },
};
</script>
<style></style>
