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
            className={`mode-button ${
              isSelected ? 'mode-button-selected' : 'mode-button-unselected'
            }`}
          >
            {mode}
          </button>
        );
      })}
    </div>
  );
} 