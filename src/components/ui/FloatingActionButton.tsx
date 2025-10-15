import { useState } from 'react';
import { useToastContext } from './ToastProvider';

interface FloatingAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color: string;
}

interface FloatingActionButtonProps {
  actions: FloatingAction[];
}

export default function FloatingActionButton({ actions }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { success } = useToastContext();

  const handleActionClick = (action: FloatingAction) => {
    action.onClick();
    setIsOpen(false);
    
    // Notification selon le type d'action
    if (action.label.includes('Nouvelle')) {
      success('Nouvelle séquence créée !');
    } else if (action.label.includes('Réinitialiser')) {
      success('Séquence réinitialisée !');
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
      {/* Actions secondaires */}
      <div className={`absolute bottom-12 sm:bottom-16 right-0 space-y-2 sm:space-y-3 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {actions.map((action, index) => (
          <div
            key={index}
            className="flex items-center gap-2 sm:gap-3 group"
          >
            <div className="bg-gray-800 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap hidden sm:block">
              {action.label}
            </div>
            <button
              onClick={() => handleActionClick(action)}
              className={`w-10 h-10 sm:w-12 sm:h-12 ${action.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 flex items-center justify-center`}
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5">
                {action.icon}
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Bouton principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}