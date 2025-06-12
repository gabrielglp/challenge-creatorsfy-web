"use client";

import React, { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from 'react';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  initialValue?: string;
  error?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 4, onComplete, initialValue = '', error }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (initialValue && initialValue.length === length) {
      setOtp(initialValue.split(''));
    }
  }, [initialValue, length]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
      setFocusedIndex(0);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }

    if (newOtp.every(char => char !== '') && newOtp.join('').length === length) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    if (!/^\d+$/.test(paste) || paste.length > length) return;

    const newOtp = paste.split('').slice(0, length);
    setOtp(newOtp.concat(Array(length - newOtp.length).fill('')));
    onComplete(newOtp.join(''));
    inputRefs.current[Math.min(length - 1, newOtp.length - 1)]?.focus();
    setFocusedIndex(Math.min(length - 1, newOtp.length - 1));
  };

  return (
    <div className="flex justify-center md:justify-normal space-x-2 md:space-x-4 mb-4">
      {otp.map((digit, index) => (
        <div key={index} className="relative">
          <input
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            onPaste={handlePaste}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            className={`w-[55px] h-[55px] md:w-12 md:h-12 lg:w-[71.78px] lg:h-[71.78px] text-center text-2xl font-bold border rounded-xl lg:rounded-2xl focus:outline-none transition-all duration-200 ${
              error 
                ? 'border-red-500 bg-red-50' 
                : focusedIndex === index 
                  ? 'border-creatorsfy-blue-dark ring-blue-200 bg-transparent' 
                  : 'border-creatorsfy-gray200 bg-white'
            }`}
            inputMode="numeric"
            pattern="[0-9]*"
          />
          <div 
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-0.5 rounded-full transition-all duration-200 ${
              digit
                ? 'opacity-0' 
                : error
                  ? 'bg-red-500 opacity-100'
                  : focusedIndex === index 
                    ? 'bg-gray-300 opacity-100' 
                    : 'bg-gray-300 opacity-100'
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default OTPInput;