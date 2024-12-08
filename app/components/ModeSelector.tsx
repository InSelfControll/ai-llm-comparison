"use client"

interface ModeSelectorProps {
  selectedMode: string;
  onModeSelect: (mode: string) => void;
}

const modes = [
  { id: 'chat', label: 'Chat' },
  { id: 'embedding', label: 'Embedding' },
  { id: 'image_generation', label: 'Image Generation' },
  { id: 'completion', label: 'Completion' },
  { id: 'audio_transcription', label: 'Audio Transcription' },
  { id: 'audio_speech', label: 'TTS (Text To Speech)' }
];

export function ModeSelector({ selectedMode, onModeSelect }: ModeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {modes.map(({ id, label }) => {
        const isSelected = selectedMode === id;
        
        return (
          <button
            key={id}
            onClick={() => onModeSelect(id)}
            className={`mode-button ${
              isSelected ? 'mode-button-selected' : 'mode-button-unselected'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
} 