import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";
import emailjs from "@emailjs/browser";
import { createContactSchema } from "../schemas/contactSchema";
import { useAlert } from "../hooks/useAlert";
import AlertModal from "../components/AlertModal";
import ParticleBackground from "../components/ParticleBackground";

const EMAILJS_SERVICE_ID = "service_hookaew43";
const EMAILJS_TEMPLATE_ID = "template_gv1x7qk";
const EMAILJS_PUBLIC_KEY = "t4cQhdGX0F2q1qy5e";

function Contact() {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const { isOpen, alertData, showAlert, closeAlert } = useAlert();

  const validateField = (name, value) => {
    const schema = createContactSchema(t);
    const partialData = { name: formData.name, email: formData.email, message: formData.message, [name]: value };
    const result = schema.safeParse(partialData);

    if (!result.success) {
      const fieldError = result.error.issues.find(
        (issue) => issue.path[0] === name
      );
      return fieldError ? fieldError.message : "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // validate field ทันทีที่พิมพ์
    const error = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate ทุก field ก่อนส่ง
    const schema = createContactSchema(t);
    const result = schema.safeParse(formData);

    if (!result.success) {
      const errors = {};
      result.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setSending(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          title: formData.name,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setFormData({ name: "", email: "", message: "" });
      showAlert({
        type: "success",
        title: t("contact.alertSuccessTitle"),
        message: t("contact.alertSuccessMessage"),
      });
    } catch (err) {
      console.error("EmailJS Error:", err);
      showAlert({
        type: "error",
        title: t("contact.alertErrorTitle"),
        message: t("contact.alertErrorMessage"),
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      className={`relative min-h-screen py-20 px-6 transition-colors ${
        isDark ? "bg-black" : "bg-gray-50"
      }`}
    >
      <ParticleBackground isDark={isDark} />
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t("contact.title")}
          </h2>
          <p
            className={`max-w-xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <h3
              className={`text-2xl font-semibold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t("contact.channelsTitle")}
            </h3>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                  {t("contact.email")}
                </p>
                <a
                  href="mailto:your.email@example.com"
                  className={`transition ${isDark ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-blue-600"}`}
                >
                  hookaew43@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                  {t("contact.phone")}
                </p>
                <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                  088-907-7100
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                  {t("contact.address")}
                </p>
                <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                  {t("contact.addressValue")}
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className={`pt-6 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
              <p className={`font-medium mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                {t("contact.social")}
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/ZuLa-P"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition ${
                    isDark
                      ? "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                      : "bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/%E0%B8%A0%E0%B8%B2%E0%B8%93%E0%B8%B8%E0%B8%9E%E0%B8%87%E0%B8%A8%E0%B9%8C-%E0%B8%AB%E0%B8%B9%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7-a94234280/"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition ${
                    isDark
                      ? "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                      : "bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/poom.phanuphong.2024/"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition ${
                    isDark
                      ? "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                      : "bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {t("contact.formName")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                    fieldErrors.name
                      ? "border-red-500"
                      : isDark
                        ? "border-gray-700"
                        : "border-gray-300"
                  } ${
                    isDark
                      ? "bg-gray-800 text-white placeholder-gray-500"
                      : "bg-white text-gray-900 placeholder-gray-400"
                  }`}
                  placeholder={t("contact.formNamePlaceholder")}
                />
                {fieldErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {t("contact.formEmail")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                    fieldErrors.email
                      ? "border-red-500"
                      : isDark
                        ? "border-gray-700"
                        : "border-gray-300"
                  } ${
                    isDark
                      ? "bg-gray-800 text-white placeholder-gray-500"
                      : "bg-white text-gray-900 placeholder-gray-400"
                  }`}
                  placeholder={t("contact.formEmailPlaceholder")}
                />
                {fieldErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {t("contact.formMessage")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none ${
                    fieldErrors.message
                      ? "border-red-500"
                      : isDark
                        ? "border-gray-700"
                        : "border-gray-300"
                  } ${
                    isDark
                      ? "bg-gray-800 text-white placeholder-gray-500"
                      : "bg-white text-gray-900 placeholder-gray-400"
                  }`}
                  placeholder={t("contact.formMessagePlaceholder")}
                />
                {fieldErrors.message && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={
                  sending ||
                  !formData.name ||
                  !formData.email ||
                  !formData.message

                }
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? "⏳ ..." : t("contact.sendButton")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Alert Modal */}
      <AlertModal
        isOpen={isOpen}
        onClose={closeAlert}
        type={alertData.type}
        title={alertData.title}
        message={alertData.message}
      />
    </section>
  );
}

export default Contact;
