"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { submitEnquiryEmail } from "@/lib/formSubmit";

interface BranchFormProps {
  branch: {
    city: string;
  };
}

export default function BranchForm({ branch }: BranchFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    try {
      await submitEnquiryEmail(`New ${branch.city} Branch Enquiry - ADCB Website`, {
        ...formData,
        branch: branch.city,
      });
      setFormSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="form" className="py-12 sm:py-20 bg-black text-white">
      <div className="max-w-[800px] mx-auto px-4 sm:px-8">
        {/* Form Heading on Top, Content Below */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-flex items-center justify-center gap-3 text-[11px] tracking-[0.3em] uppercase text-white/60 font-medium mb-2">
            <span className="w-8 h-[1px] bg-white/20" />
            ADMISSION CONSULTATION
            <span className="w-8 h-[1px] bg-white/20" />
          </span>
          <h2 className="font-[var(--font-outfit)] text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Inquire with
            <span className="font-semibold text-white"> this Branch</span>
          </h2>
        </div>

        <div className="bg-transparent shadow-none">
          {formSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 text-white mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Inquiry Received Successfully</h3>
              <p className="text-zinc-400 text-sm">Thank you for contacting ADCB Consultancy. Our {branch.city} office will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#181818] border border-zinc-600 text-white text-sm focus:outline-none focus:border-white transition-colors rounded-sm placeholder-zinc-600"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    minLength={10}
                    className="w-full px-4 py-3 bg-[#181818] border border-zinc-600 text-white text-sm focus:outline-none focus:border-white transition-colors rounded-sm placeholder-zinc-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="9876543210"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#181818] border border-zinc-600 text-white text-sm focus:outline-none focus:border-white transition-colors rounded-sm placeholder-zinc-600"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="course" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Course Interest
                </label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#181818] border border-zinc-600 text-white text-sm focus:outline-none focus:border-white transition-colors rounded-sm"
                  required
                >
                  <option value="" className="bg-[#121212]">Select a Course</option>
                  <option value="mbbs" className="bg-[#121212]">MBBS</option>
                  <option value="mds" className="bg-[#121212]">MDS</option>
                  <option value="md-ms" className="bg-[#121212]">MD / MS</option>
                  <option value="mba" className="bg-[#121212]">MBA</option>
                  <option value="mttm" className="bg-[#121212]">MTTM</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Message / Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#181818] border border-zinc-600 text-white text-sm focus:outline-none focus:border-white transition-colors rounded-sm placeholder-zinc-600"
                  placeholder="Detail your requirements here..."
                  required
                ></textarea>
              </div>

              {submitError && (
                <p className="text-sm text-[#ED1C24] text-center">
                  Something went wrong while sending your message. Please try again.
                </p>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="white"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full uppercase tracking-wider text-xs font-bold font-[var(--font-outfit)]"
                >
                  {isSubmitting ? "Submitting..." : "Submit Message"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
