import React from 'react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div
        className="bg-white dark:bg-[#1e222d] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg className="h-6 w-auto text-black dark:text-white fill-current" viewBox="0 0 36 28">
              <path d="M12.5 0H7.8C7.1 0 6.5.6 6.5 1.3V19c0 .7.6 1.3 1.3 1.3h4.7c.7 0 1.3-.6 1.3-1.3V1.3C13.8.6 13.2 0 12.5 0z" />
              <path d="M2.6 7.8H0V26.7C0 27.4.6 28 1.3 28h4c.7 0 1.3-.6 1.3-1.3V7.8H2.6z" />
              <path d="M34.7 0H20.3c-.7 0-1.3.6-1.3 1.3v5.2c0 .7.6 1.3 1.3 1.3h5.7L18.4 26.2c-.3.7.2 1.8 1 1.8h5.3c.5 0 .9-.3 1.1-.7l9.9-24.8c.3-.8-.3-1.7-1-1.7v-.8z" />
            </svg>
            <span className="font-extrabold text-lg text-slate-900 dark:text-white">Get started</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
          Join over 60 million traders and investors around the world making smarter decisions with TradingView.
        </p>

        {/* Social auth buttons */}
        <div className="space-y-2.5 mb-5">
          <button
            onClick={onClose}
            type="button"
            className="w-full py-2.5 px-4 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.64-5.2 3.64-9.15z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.92H1.2v3.15C3.17 21.3 7.3 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.32 14.28c-.24-.72-.38-1.5-.38-2.28s.14-1.56.38-2.28V6.57H1.2C.44 8.08 0 9.98 0 12s.44 3.92 1.2 5.43l4.12-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.77c1.76 0 3.34.61 4.58 1.8l3.43-3.43C17.94 1.18 15.23 0 12 0 7.3 0 3.17 2.7 1.2 6.57l4.12 3.15c.94-2.82 3.58-4.95 6.68-4.95z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            onClick={onClose}
            type="button"
            className="w-full py-2.5 px-4 bg-black text-white dark:bg-white dark:text-black rounded-xl text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.77-8.08-12.24-15.01-6.19-9.59-11.08-20.73-14.67-33.43-3.59-12.7-5.39-24.63-5.39-35.8 0-14.56 3.63-26.79 10.88-36.68 7.26-9.9 16.48-14.99 27.67-15.28 4.24 0 9.27 1.25 15.08 3.75 5.81 2.5 9.77 3.87 11.88 4.12 1.95-.25 5.92-1.66 11.89-4.24 5.97-2.58 10.88-3.75 14.74-3.51 11.75.58 21.05 4.96 27.89 13.14-10.42 6.32-15.51 15.11-15.27 26.36.24 8.78 3.51 16.14 9.8 22.08 6.3 5.94 13.88 9.38 22.75 10.33-2.12 6.33-4.66 12.78-7.61 19.35zm-33.15-104.7c0-6.19 2.29-12.13 6.87-17.81 4.58-5.68 10.34-9.35 17.29-11.01.25 1.5.38 2.87.38 4.12 0 6.07-2.4 12.08-7.21 18.03-4.8 5.95-10.74 9.47-17.81 10.56-.25-1.25-.38-2.54-.38-3.89z" />
            </svg>
            <span>Continue with Apple</span>
          </button>
        </div>

        <div className="relative flex py-2 items-center mb-3">
          <div className="grow border-t border-slate-200 dark:border-slate-800" />
          <span className="shrink mx-3 text-[11px] text-slate-400">or with email</span>
          <div className="grow border-t border-slate-200 dark:border-slate-800" />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="space-y-2.5"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-[#f0f3fa] dark:bg-slate-800 text-slate-900 dark:text-white text-xs rounded-xl px-3.5 py-2.5 border-none focus:outline-hidden focus:ring-2 focus:ring-[#2962ff]"
            required
          />
          <button
            type="submit"
            className="w-full py-2.5 bg-[#2962ff] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Continue
          </button>
        </form>

        <p className="text-[10px] text-center text-slate-400 mt-4 leading-tight">
          By signing up, you agree to TradingView&apos;s Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};
