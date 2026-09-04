"use client";

import { useState, useEffect } from "react";
import { Button } from "./Button";
import { submitEnquiryEmail } from "@/lib/formSubmit";

type CourseKey = "MBBS" | "MD/MS" | "MDS";
type MdStreamKey = "MD/MS" | "DNB";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourse?: CourseKey;
  lockedCourse?: CourseKey;
}

const courses: { key: CourseKey; label: string }[] = [
  { key: "MBBS", label: "MBBS" },
  { key: "MD/MS", label: "MD/MS" },
  { key: "MDS", label: "MDS" },
];

const neetExamOptions = ["Fresher", "Repeater", "Re-repeater", "Super repeater"];
const categoryOptions = ["GN", "OBC", "SC", "ST"];
const quotaOptions = ["Govt", "Mgmt", "NRI"];
const bondOptions = ["With Bond", "Without Bond", "Both"];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-[var(--font-outfit)] text-sm font-bold text-white uppercase tracking-wider pt-1 pb-3 border-b border-white/10 mb-5 text-left">
      {children}
    </h3>
  );
}

function TextField({
  name,
  label,
  value,
  onChange,
  placeholder,
  required = true,
  hint,
  type = "text",
}: {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  type?: string;
}) {
  return (
    <div className="text-left">
      <label htmlFor={name} className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 text-left">
        {label} {required && <span className="text-[#ED1C24]">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-[#181818] border border-zinc-600 text-white text-sm focus:outline-none focus:border-white transition-colors rounded-sm placeholder-zinc-600 text-left [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      {hint && <p className="text-[11px] text-white/40 mt-1 text-left">{hint}</p>}
    </div>
  );
}

function SelectField({
  name,
  label,
  value,
  onChange,
  options,
  placeholder,
  required = true,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="text-left">
      <label htmlFor={name} className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 text-left">
        {label} {required && <span className="text-[#ED1C24]">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 bg-[#181818] border border-zinc-600 text-white text-sm focus:outline-none focus:border-white transition-colors rounded-sm text-left"
      >
        <option value="" className="bg-[#121212]">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-[#121212]">{opt}</option>
        ))}
      </select>
    </div>
  );
}

export default function ConsultationModal({ isOpen, onClose, initialCourse = "MBBS", lockedCourse }: ConsultationModalProps) {
  const [selectedCourse, setSelectedCourse] = useState<CourseKey>(lockedCourse ?? initialCourse);
  const [mdStream, setMdStream] = useState<MdStreamKey>("MD/MS");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    try {
      await submitEnquiryEmail(`New ${selectedCourse} Enquiry - ADCB Website`, {
        ...formData,
        course: selectedCourse === "MD/MS" ? mdStream : selectedCourse,
      });
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setFormData({});
    setSelectedCourse(lockedCourse ?? initialCourse);
    setMdStream("MD/MS");
    onClose();
  };

  const contactSection = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <TextField name="candidateName" label="Candidate Name" value={formData.candidateName ?? ""} onChange={handleChange} placeholder="Full name" />
      <TextField name="contactNumber" label="Contact Number" value={formData.contactNumber ?? ""} onChange={handleChange} placeholder="Phone number" type="number" />
      <SelectField name="branch" label="Branch" value={formData.branch ?? ""} onChange={handleChange} options={["Kochi", "Calicut"]} placeholder="Select branch" />
      <TextField name="locationCity" label="Location/City" value={formData.locationCity ?? ""} onChange={handleChange} placeholder="City, State" />
    </div>
  );

  const admissionSectionMbbs = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <SelectField name="candidateCategory" label="Candidate Category" value={formData.candidateCategory ?? ""} onChange={handleChange} options={categoryOptions} placeholder="Select category" />
      <TextField name="reservationCategory" label="Reservation Category (Any religious reservation)" value={formData.reservationCategory ?? ""} onChange={handleChange} placeholder="If applicable" />
      <TextField name="minorityReservation" label="Minority Reservation (Any religious minority reservation)" value={formData.minorityReservation ?? ""} onChange={handleChange} placeholder="If applicable" />
      <TextField name="otherReservation" label="Any Other Reservation" value={formData.otherReservation ?? ""} onChange={handleChange} placeholder="If applicable" required={false} />
      <TextField name="preferredStates" label="Preferred States" value={formData.preferredStates ?? ""} onChange={handleChange} placeholder="e.g. Kerala, Karnataka" />
      <SelectField name="quotaApplied" label="Quota Applied For (Govt / Mgmt / NRI)" value={formData.quotaApplied ?? ""} onChange={handleChange} options={quotaOptions} placeholder="Select quota" />
      <TextField name="budget" label="Budget (Max/Min)" value={formData.budget ?? ""} onChange={handleChange} placeholder="e.g. ₹10-20 Lakhs" />
    </div>
  );

  const admissionSectionMdMds = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <SelectField name="candidateCategory" label="Candidate Category" value={formData.candidateCategory ?? ""} onChange={handleChange} options={categoryOptions} placeholder="Select category" />
      <TextField name="reservationCategory" label="Reservation Category (Any religious reservation)" value={formData.reservationCategory ?? ""} onChange={handleChange} placeholder="If applicable" />
      <TextField name="minorityReservation" label="Minority Reservation (Any religious minority reservation)" value={formData.minorityReservation ?? ""} onChange={handleChange} placeholder="If applicable" />
      <SelectField name="quotaApplied" label="Quota Applied For (Govt / Mgmt / NRI)" value={formData.quotaApplied ?? ""} onChange={handleChange} options={quotaOptions} placeholder="Select quota" />
    </div>
  );

  const academicFieldsCommon = (
    <>
      <TextField name="neetScore" label="NEET Score" value={formData.neetScore ?? ""} onChange={handleChange} placeholder="Your NEET score" type="number" />
      <TextField name="airRank" label="All India Rank (AIR)" value={formData.airRank ?? ""} onChange={handleChange} placeholder="Your AIR" type="number" />
      <TextField name="stateMedicalRank" label="State Medical Rank" value={formData.stateMedicalRank ?? ""} onChange={handleChange} placeholder="If applicable" required={false} hint="Ask only if Kerala rank comes" type="number" />
    </>
  );

  return (
    <div
      className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-start justify-center overflow-y-auto p-4 md:p-8 transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      onClick={resetAndClose}
    >
      <div
        className={`bg-[#0b0b0b] border border-white/10 shadow-2xl w-full max-w-[75rem] md:max-w-5xl rounded-lg overflow-hidden transition-all duration-500 my-auto ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0d0d0d] text-left">
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-widest text-[#ED1C24] font-bold mb-1 block text-left">
              FREE CONSULTATION
            </span>
            <h2 className="font-[var(--font-outfit)] text-xl font-semibold text-white text-left">
              Candidate Information & Screening Record
            </h2>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-all"
            aria-label="Close consultation"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Course Selector */}
        {!lockedCourse && (
          <div className="flex flex-wrap gap-2 px-6 pt-5">
            {courses.map((course) => (
              <button
                key={course.key}
                onClick={() => setSelectedCourse(course.key)}
                className={`px-5 py-2.5 text-sm font-semibold rounded-full border transition-all duration-300 ${selectedCourse === course.key
                  ? "bg-[#ED1C24] border-[#ED1C24] text-white"
                  : "border-white/20 text-white/70 hover:text-white hover:border-white/40"
                  }`}
              >
                {course.label}
              </button>
            ))}
          </div>
        )}

        {/* Form Area */}
        <div className="px-6 py-6 max-h-[65vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 text-white mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Enquiry Submitted Successfully</h3>
              <p className="text-zinc-400 text-sm">Thank you for contacting ADCB Consultancy. Our team will get back to you within 24 hours.</p>
              <Button onClick={resetAndClose} variant="white" className="mt-4">
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 1. Personal & Contact Details */}
              <section>
                <SectionTitle>1. Personal &amp; Contact Details</SectionTitle>
                {contactSection}
              </section>

              {/* 2. Academic & Registration Details */}
              <section>
                <SectionTitle>2. Academic &amp; Registration Details</SectionTitle>

                {selectedCourse === "MBBS" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {academicFieldsCommon}
                    <SelectField name="neetExamStatus" label="Regarding NEET exam" value={formData.neetExamStatus ?? ""} onChange={handleChange} options={neetExamOptions} placeholder="Select status" />
                  </div>
                )}

                {selectedCourse === "MD/MS" && (
                  <div className="space-y-5">
                    <div className="flex gap-2">
                      {(["MD/MS", "DNB"] as MdStreamKey[]).map((stream) => (
                        <button
                          key={stream}
                          onClick={() => setMdStream(stream)}
                          className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 ${mdStream === stream
                            ? "bg-white text-black border-white"
                            : "border-white/20 text-white/60 hover:text-white"
                            }`}
                        >
                          {stream}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {academicFieldsCommon}
                      <TextField name="otherReservation" label="Any Other Reservation" value={formData.otherReservation ?? ""} onChange={handleChange} placeholder="If applicable" required={false} />
                      <TextField name="preferredBranch" label="Preferred Branch" value={formData.preferredBranch ?? ""} onChange={handleChange} placeholder="e.g. General Medicine, Orthopaedics" />
                      <TextField name="preferredState" label="Preferred State" value={formData.preferredState ?? ""} onChange={handleChange} placeholder="e.g. Kerala, Karnataka" />
                      <SelectField name="collegePreferred" label="College Preferred (With Bond / Without Bond)" value={formData.collegePreferred ?? ""} onChange={handleChange} options={bondOptions} placeholder="Select preference" />
                      <TextField name="stipendExpectation" label="Stipend Expectation" value={formData.stipendExpectation ?? ""} onChange={handleChange} placeholder="e.g. 60000" type="number" />
                      <TextField name="budget" label="Budget (Max/Min)" value={formData.budget ?? ""} onChange={handleChange} placeholder="e.g. ₹20-40 Lakhs" />
                      <SelectField name="neetExamStatus" label="Regarding NEET exam" value={formData.neetExamStatus ?? ""} onChange={handleChange} options={neetExamOptions} placeholder="Select status" />
                    </div>
                  </div>
                )}

                {selectedCourse === "MDS" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {academicFieldsCommon}
                    <TextField name="otherReservation" label="Any Other Reservation" value={formData.otherReservation ?? ""} onChange={handleChange} placeholder="If applicable" required={false} />
                    <TextField name="preferredBranch" label="Preferred Branch" value={formData.preferredBranch ?? ""} onChange={handleChange} placeholder="e.g. Orthodontics, Prosthodontics" />
                    <TextField name="preferredState" label="Preferred State" value={formData.preferredState ?? ""} onChange={handleChange} placeholder="e.g. Kerala, Karnataka" />
                    <TextField name="budget" label="Budget (Max/Min)" value={formData.budget ?? ""} onChange={handleChange} placeholder="e.g. ₹15-30 Lakhs" />
                    <SelectField name="neetExamStatus" label="Regarding NEET exam" value={formData.neetExamStatus ?? ""} onChange={handleChange} options={neetExamOptions} placeholder="Select status" />
                  </div>
                )}
              </section>

              {/* 3. Admission Preferences */}
              <section>
                <SectionTitle>3. Admission Preferences</SectionTitle>
                {selectedCourse === "MBBS" ? admissionSectionMbbs : admissionSectionMdMds}
              </section>

              <p className="text-[11px] leading-relaxed text-white/40 border-t border-white/10 pt-4">
                Note: Ensure that all details are collected accurately before proceeding with counselling or admission guidance. Verify all documents against provided info.
              </p>

              {submitError && (
                <p className="text-sm text-[#ED1C24] text-center">
                  Something went wrong while sending your enquiry. Please try again.
                </p>
              )}

              <Button
                type="submit"
                variant="white"
                size="lg"
                disabled={isSubmitting}
                className="w-full uppercase tracking-wider text-xs font-bold font-[var(--font-outfit)]"
              >
                {isSubmitting ? "Submitting..." : `Submit ${selectedCourse} Enquiry`}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
