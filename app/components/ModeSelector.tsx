"use client"

interface ModeSelectorProps {
  selectedMode: string;
  onModeSelect: (mode: string) => void;
}

const modes = [
  'Chat',
  'Embedding',
  'Image generation',
  'Completion',
  'Audio transcription',
  'TTS (Text To Speech)'
];

export function ModeSelector({ selectedMode, onModeSelect }: ModeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {modes.map((mode) => {
        const modeValue = mode.toLowerCase().replace(' ', '_');
        const isSelected = selectedMode === modeValue;
        
        return (
          <button
            key={mode}
            onClick={() => onModeSelect(modeValue)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${isSelected 
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100'
              }
            `}
          >
            {mode}
          </button>
        );
      })}
    </div>
  );
} 