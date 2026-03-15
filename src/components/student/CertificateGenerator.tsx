"use client"

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CertificatePDF } from '@/components/certificates/CertificatePDF';
import type { CertElement } from "@/lib/certificates/types"

// Types for certificate data
type CertificateData = {
  folio: string
  recipientName: string
  courseName: string
  courseHours: string
  institutionalText: string
  issueDate: string
  issuedBy: string
  qrUrl: string | null
  signers: Array<{ name: string; role: string; signature_url?: string | null }>
  primaryColor?: string
  elementLayout?: CertElement[] | null
  backgroundUrl?: string | null
}

// QR code generation helper (generates data URL from text)
async function generateQRDataUrl(text: string): Promise<string> {
  try {
    // Use a simple QR code API to generate the image
    const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}&format=png`)
    const blob = await response.blob()
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch {
    return '' // Return empty if QR generation fails
  }
}

export function CertificateGenerator({ 
  certificate,
  className
}: { 
  certificate: CertificateData,
  className?: string 
}) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="flex items-center gap-2 text-violet-500 font-semibold bg-violet-500/10 px-4 py-2 rounded-xl">
      <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
      Preparando certificado...
    </div>
  );

  const handleDownload = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      
      // Generate QR code if we have a URL
      let qrDataUrl = ''
      if (certificate.qrUrl) {
        qrDataUrl = await generateQRDataUrl(certificate.qrUrl)
      }

      const doc = (
        <CertificatePDF
          recipientName={certificate.recipientName}
          courseName={certificate.courseName}
          courseHours={certificate.courseHours}
          institutionalText={certificate.institutionalText}
          folio={certificate.folio}
          issueDate={certificate.issueDate}
          issuedBy={certificate.issuedBy}
          qrDataUrl={qrDataUrl}
          signers={certificate.signers}
          primaryColor={certificate.primaryColor}
          elementLayout={certificate.elementLayout}
          backgroundUrl={certificate.backgroundUrl}
        />
      );
      
      const blob = await pdf(doc).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Certificado_${certificate.folio}_${certificate.recipientName.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error generating certificate PDF:", err);
      alert("Hubo un error al generar el PDF del certificado. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={cn(
        "flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-violet-600 to-primary text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95",
        className,
        loading ? "opacity-70 cursor-not-allowed" : ""
      )}
    >
      {loading ? (
        <>
          <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
          Generando PDF...
        </>
      ) : (
        <>
          <span className="material-symbols-outlined text-base">picture_as_pdf</span>
          Descargar Certificado PDF
        </>
      )}
    </button>
  );
}
