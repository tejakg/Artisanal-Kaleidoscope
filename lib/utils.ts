import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in Indian Rupees
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Debounce function for search and form inputs
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Generate WhatsApp click-to-chat URL
 */
export function getWhatsAppUrl(phoneNumber: string, message?: string): string {
  const baseUrl = 'https://wa.me/';
  const number = phoneNumber.replace(/\D/g, '');
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : '';
  return `${baseUrl}${number}${encodedMessage}`;
}

/**
 * Extract YouTube video ID from URL
 */
export function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

/**
 * Lazy load images with intersection observer
 */
export function lazyLoadImage(
  imageElement: HTMLImageElement,
  src: string
): void {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        imageElement.src = src;
        observer.unobserve(imageElement);
      }
    });
  });
  observer.observe(imageElement);
}
