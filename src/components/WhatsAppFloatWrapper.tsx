"use client";

import { usePathname } from "next/navigation";

import WhatsAppFloat from "@/components/WhatsAppFloat";

interface WhatsAppFloatWrapperProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export default function WhatsAppFloatWrapper({ phoneNumber, defaultMessage }: WhatsAppFloatWrapperProps) {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return <WhatsAppFloat phoneNumber={phoneNumber} defaultMessage={defaultMessage} />;
}
