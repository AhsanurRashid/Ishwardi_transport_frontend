"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer, X } from "lucide-react";
import { getRentCompanyWise } from "@/app/actions/rent-action";
import { getCompanyForEditAction } from "@/app/actions/getCompanyForEditAction";
import { IRent } from "@/lib/types";

// ─── Number to words ──────────────────────────────────────────────────────────
const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function convertHundreds(n: number): string {
  if (n >= 100) {
    return (
      ones[Math.floor(n / 100)] +
      " Hundred" +
      (n % 100 ? " " + convertHundreds(n % 100) : "")
    );
  } else if (n >= 20) {
    return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
  } else {
    return ones[n];
  }
}

function numberToWords(num: number): string {
  if (num === 0) return "Zero";
  if (num < 0) return "Minus " + numberToWords(-num);
  const intPart = Math.floor(num);
  let result = "";
  if (intPart >= 10000000) {
    result +=
      convertHundreds(Math.floor(intPart / 10000000)) +
      " Crore " +
      numberToWords(intPart % 10000000);
  } else if (intPart >= 100000) {
    result +=
      convertHundreds(Math.floor(intPart / 100000)) +
      " Lakh " +
      numberToWords(intPart % 100000);
  } else if (intPart >= 1000) {
    result +=
      convertHundreds(Math.floor(intPart / 1000)) +
      " Thousand" +
      (intPart % 1000 ? " " + numberToWords(intPart % 1000) : "");
  } else {
    result += convertHundreds(intPart);
  }
  return result.trim();
}
// ─────────────────────────────────────────────────────────────────────────────

interface BillData {
  company: {
    id: number;
    company_name: string;
    company_address: string;
    company_email: string;
    company_phone: string;
    company_invoice_number: string;
  };
  rents: IRent[];
}

const CompanyBillPrintButton = ({
  companyId,
  from,
  to,
}: {
  companyId: number;
  from?: string;
  to?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [billData, setBillData] = useState<BillData | null>(null);

  const handleOpenBill = async () => {
    setIsLoading(true);
    try {
      const [companyRes, rentsRes] = await Promise.all([
        getCompanyForEditAction({ companyId }),
        getRentCompanyWise({ companyId, page: 1, limit: 9999, from, to }),
      ]);
      if (!companyRes?.error && !rentsRes?.error) {
        setBillData({
          company: companyRes.data,
          rents: rentsRes?.list || [],
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // ── Bill Preview Overlay ────────────────────────────────────────────────────
  if (billData) {
    const totalCaring = billData.rents.reduce(
      (sum, r) => sum + Number(r.rentAmount || 0),
      0,
    );
    const totalDemurrage = billData.rents.reduce(
      (sum, r) => sum + Number(r.demurrageAmount || 0),
      0,
    );
    const grandTotal = totalCaring + totalDemurrage;
    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return (
      <>
        {/* Print-specific CSS */}
        <style>{`
          @media print {
            body * { visibility: hidden !important; }
            #bill-print-root,
            #bill-print-root * { visibility: visible !important; }
            #bill-print-root {
              position: fixed !important;
              inset: 0 !important;
              background: white !important;
              overflow: visible !important;
              display: block !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            .no-print { display: none !important; visibility: hidden !important; }
            .bill-a4 {
              box-shadow: none !important;
              border: none !important;
              margin: 0 auto !important;
              width: 100% !important;
              max-width: 210mm !important;
              padding: 15mm !important;
            }
            @page { size: A4; margin: 0; }
          }
        `}</style>

        {/* Full-screen overlay */}
        <div
          id="bill-print-root"
          className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center overflow-y-auto py-6"
        >
          {/* Action bar */}
          <div className="no-print fixed top-4 right-4 flex gap-2 z-50">
            <Button onClick={handlePrint} size="sm">
              <Printer className="h-4 w-4 mr-2" />
              প্রিন্ট করুন
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setBillData(null)}
            >
              <X className="h-4 w-4 mr-2" />
              বন্ধ করুন
            </Button>
          </div>

          {/* A4 Bill */}
          <div
            className="bill-a4 bg-white w-[210mm] min-h-[297mm] shadow-2xl mx-auto px-[15mm] py-[14mm] text-black text-[13px] font-sans"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {/* ── Header ─────────────────────────────────────────────────── */}
            <div className="flex items-start gap-4 border-b-2 border-[#2a6eac] pb-3 mb-3">
              {/* Left: contact numbers */}
              <div className="text-[11px] leading-5 w-28 shrink-0 mt-6">
                <p>✆ 01711-317955</p>
                <p>01714-814424</p>
                <p>01711-074311</p>
              </div>

              {/* Center: logo + name */}
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center gap-3">
                  {/* Truck icon placeholder */}
                  <div className="w-14 h-14 border-2 border-[#2a6eac] rounded flex items-center justify-center text-[#2a6eac]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-9 h-9"
                    >
                      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5 1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zm9.78 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-[22px] font-bold text-[#2a6eac] leading-tight">
                      M/S. ISHWARDI TRANSPORT & AGENCY
                    </h1>
                    <div className="bg-[#2a6eac] text-white text-[11px] font-semibold px-3 py-0.5 mt-1 inline-block">
                      Inter District Goods Carrying & Agency
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: proprietor info */}
              <div className="text-[11px] leading-5 w-44 shrink-0 mt-6 text-right">
                <p>
                  <span className="font-semibold">Proprietor :</span> Md.
                  Tohurul Islam (Manik)
                </p>
                <p>Md Shibrul Islam & Md. Masud Rana</p>
                <p>Station Road, Malgudam, Ishurdi, Pabna.</p>
              </div>
            </div>

            {/* ── To + Date + Invoice ─────────────────────────────────────── */}
            <div className="flex justify-between items-start mb-3">
              <div className="text-[12px]">
                <p className="font-semibold">To,</p>
                <p className="font-semibold">{billData.company.company_name}</p>
                {billData.company.company_address && (
                  <p>{billData.company.company_address}</p>
                )}
                {billData.company.company_phone && (
                  <p>Phone: {billData.company.company_phone}</p>
                )}
              </div>
              <div className="text-right text-[12px]">
                <p>
                  <span className="font-semibold">Date :</span> {today}
                </p>
                {billData.company.company_invoice_number && (
                  <p className="font-bold mt-1">
                    Invoice No-{billData.company.company_invoice_number}
                  </p>
                )}
              </div>
            </div>

            {/* ── Salutation ──────────────────────────────────────────────── */}
            <p className="text-[12px] mb-2">Dear Sir,</p>
            <p className="text-[12px] mb-3">
              With due respect to my carrying proposal, I am pleased to submit
              my following bills.
            </p>

            {/* ── Main Table ──────────────────────────────────────────────── */}
            <table className="w-full border-collapse text-[11.5px] mb-3">
              <thead>
                <tr className="bg-[#d6e4f7]">
                  <th className="border border-black px-2 py-1 text-center w-16">
                    Chalan
                    <br />
                    No.
                  </th>
                  <th className="border border-black px-2 py-1 text-center w-20">
                    Date
                  </th>
                  <th className="border border-black px-2 py-1 text-center">
                    Description
                  </th>
                  <th className="border border-black px-2 py-1 text-center w-24">
                    Demurrage
                    <br />
                    Fee
                  </th>
                  <th className="border border-black px-2 py-1 text-center w-24">
                    Caring Cost
                  </th>
                  <th className="border border-black px-2 py-1 text-center w-24">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {billData.rents.map((rent, idx) => {
                  const demurrage = Number(rent.demurrageAmount || 0);
                  const caring = Number(rent.rentAmount || 0);
                  const rowTotal = caring + demurrage;
                  return (
                    <tr key={rent.id}>
                      <td className="border border-black px-2 py-1 text-center">
                        {idx + 1}
                      </td>
                      <td className="border border-black px-2 py-1 text-center">
                        {new Date(rent.from_date).toLocaleDateString("en-GB")}
                      </td>
                      <td className="border border-black px-2 py-1">
                        Loaded from{" "}
                        <span className="font-semibold">
                          {rent.fromLocation}
                        </span>{" "}
                        to unloaded address-{" "}
                        <span className="font-semibold">{rent.toLocation}</span>
                        <br />
                        <span className="font-bold">
                          Track No. covervan. {rent.vehicle}
                        </span>
                      </td>
                      <td className="border border-black px-2 py-1 text-center">
                        {demurrage > 0
                          ? demurrage.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                            })
                          : "NO"}
                      </td>
                      <td className="border border-black px-2 py-1 text-right">
                        {caring.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="border border-black px-2 py-1 text-right">
                        {rowTotal.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  );
                })}

                {/* Total row */}
                <tr className="font-bold">
                  <td
                    className="border border-black px-2 py-1 text-right"
                    colSpan={3}
                  >
                    TOTAL=
                  </td>
                  <td className="border border-black px-2 py-1 text-right">
                    {totalDemurrage > 0
                      ? totalDemurrage.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })
                      : ""}
                  </td>
                  <td className="border border-black px-2 py-1 text-right">
                    {totalCaring.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="border border-black px-2 py-1 text-right">
                    {grandTotal.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ── Amount in words ─────────────────────────────────────────── */}
            <p className="text-[12px] font-semibold mb-1">
              In Word:{" "}
              <span className="font-normal">
                {numberToWords(grandTotal)} TK Only.
              </span>
            </p>
            <p className="text-[11px] mb-1">Excluding Vat &amp; Tax</p>
            <p className="text-[11px] mb-6">
              This is for your kind information &amp; necessary action please
              with my submitted bill
            </p>

            {/* ── Footer ──────────────────────────────────────────────────── */}
            <div className="flex justify-between items-end mt-10">
              <div className="text-[11px] border border-black p-2">
                <p className="font-bold">M/S ISHURDI TRANSPORT &amp; AGENCY</p>
                <p>Trust Bank A\C : 00850210004653</p>
                <p>Bank Asia A/C : 04033001565</p>
              </div>
              <div className="text-center text-[12px]">
                <p>You&apos;re faithfully</p>
                <div className="mt-10 border-t border-black pt-1">
                  <p className="font-bold">
                    M/S ISHURDI TRANSPORT &amp; AGENCY
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Original button still visible behind overlay (hidden by overlay) */}
        <Button size="default" variant="outline" disabled>
          <Printer className="h-4 w-4 mr-2" />
          বিল প্রিন্ট
        </Button>
      </>
    );
  }

  // ── Default Button ──────────────────────────────────────────────────────────
  return (
    <Button
      size="default"
      variant="outline"
      onClick={handleOpenBill}
      disabled={isLoading}
    >
      <Printer className="h-4 w-4 mr-2" />
      {isLoading ? "লোড হচ্ছে..." : "বিল প্রিন্ট"}
    </Button>
  );
};

export default CompanyBillPrintButton;
