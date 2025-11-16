// hooks/useFormSubmit.ts - NO 'any' types for strict ESLint

import { useState } from 'react';

interface UseFormSubmitResult {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isSubmitting: boolean;
  isSuccess: boolean;
  message: string | null;
  reset: () => void;
}

interface SubmitResponse {
  success: boolean;
  message?: string;
  redirect?: string;
  submissionId?: string;
}

/**
 * Universal form submission hook
 * Only needs formId - backend handles everything else
 */
export function useFormSubmit(): UseFormSubmitResult {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const formElement = e.currentTarget;
      
      // Get formId from form element
      const formId = formElement.getAttribute('data-form-id');
      if (!formId) {
        throw new Error('Form ID not found. Make sure form has data-form-id attribute.');
      }

      // Extract form data
      const formData = new FormData(formElement);
      const data: Record<string, string> = {};
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      // Get API URL
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5500';

      console.log('📤 Submitting form:', {
        formId,
        fields: Object.keys(data),
        apiUrl
      });

      // Submit to backend
      const response = await fetch(`${apiUrl}/api/forms/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId,
          formData: data
        })
      });

      const result: SubmitResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Submission failed');
      }

      console.log('✅ Form submitted successfully:', result);

      // Backend returned success
      setIsSuccess(true);
      setMessage(result.message || 'Thank you for your submission!');
      
      // Reset form
      formElement.reset();

      // Handle redirect if backend says so
      if (result.redirect) {
        setTimeout(() => {
          window.location.href = result.redirect as string;
        }, 2000);
      } else {
        // Auto-hide message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
          setMessage(null);
        }, 5000);
      }

    } catch (error) {
      console.error('❌ Form submission error:', error);
      setIsSuccess(false);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit form. Please try again.';
      setMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setIsSubmitting(false);
    setIsSuccess(false);
    setMessage(null);
  };

  return {
    handleSubmit,
    isSubmitting,
    isSuccess,
    message,
    reset
  };
}