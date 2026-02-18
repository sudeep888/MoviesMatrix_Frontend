import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/* 🎬 ICONS */
import {
  CheckCircle,
  Clock,
  Download,
  Film,
  IndianRupee,
  MapPin,
  Ticket,
} from "lucide-react";

export default function Success() {
  const { state } = useLocation();

  const bookingId =
    "MM" +
    Math.floor(Math.random() * 1000000);

  const ticketRef = useRef();

  /* 🎉 CONFETTI */
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 90,
    });
  }, []);

  /* 📄 PDF DOWNLOAD */
  const downloadTicket = async () => {
    const canvas =
      await html2canvas(ticketRef.current);

    const imgData =
      canvas.toDataURL("image/png");

    const pdf = new jsPDF();

    pdf.addImage(
      imgData,
      "PNG",
      10,
      20,
      180,
      100
    );

    pdf.save("TheatreTicket.pdf");
  };

  if (!state)
    return (
      <div className="text-white pt-28 text-center">
        No booking data found.
      </div>
    );

  return (
    <div
      className="
        min-h-screen
        bg-black
        text-white
        
        pt-24 sm:pt-28
        px-4
        
        flex flex-col
        items-center
      "
    >
      {/* ✅ SUCCESS TITLE */}
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="
          text-3xl sm:text-4xl
          font-semibold
          text-green-400
          mb-10
          
          flex items-center gap-3
        "
      >
        <CheckCircle size={34} />
        Booking Confirmed
      </motion.h1>

      {/* 🎟️ OTT DIGITAL TICKET */}
      <div
        ref={ticketRef}
        className="
          w-full
          max-w-md
          
          bg-gradient-to-b
          from-white/10
          to-white/5
          
          backdrop-blur-xl
          
          border border-white/10
          
          p-6 sm:p-7
          
          rounded-2xl
          
          shadow-[0_0_40px_rgba(0,0,0,0.8)]
        "
      >
        {/* MOVIE */}
        <div className="flex items-center gap-3 mb-4">
          <Film className="text-red-500" />
          <h2 className="text-lg font-semibold">
            {state.movie}
          </h2>
        </div>

        {/* THEATRE */}
        <div className="flex items-center gap-3 mb-3 text-gray-300">
          <MapPin size={18} />
          {state.theatre}
        </div>

        {/* TIME */}
        <div className="flex items-center gap-3 mb-3 text-gray-300">
          <Clock size={18} />
          {state.time}
        </div>

        {/* SEATS */}
        <div className="flex items-center gap-3 mb-3 text-gray-300">
          <Ticket size={18} />
          {state.seats
            .map((s) => s.seat)
            .join(", ")}
        </div>

        {/* TOTAL */}
        <div className="flex items-center gap-3 mb-4 text-gray-200 border-t border-white/10 pt-3">
          <IndianRupee
            size={18}
            className="text-green-400"
          />
          ₹{state.total}
        </div>

        {/* BOOKING ID */}
        <p className="text-xs text-gray-400 mb-4">
          Booking ID: {bookingId}
        </p>

        {/* QR */}
        <div className="flex justify-center">
          <div className="bg-white p-3 rounded-lg">
            <QRCodeCanvas
              value={bookingId}
              size={130}
            />
          </div>
        </div>
      </div>

      {/* 📥 DOWNLOAD BUTTON */}
      <button
        onClick={downloadTicket}
        className="
          mt-8
          
          flex items-center gap-2
          
          bg-red-600
          
          px-6 py-3
          
          rounded-lg
          
          font-semibold
          
          hover:bg-red-700
          hover:scale-105
          
          transition-all duration-300
          
          shadow-lg
          shadow-red-900/50
          hover:shadow-red-700/60
        "
      >
        <Download size={18} />
        Download Ticket
      </button>
    </div>
  );
}
