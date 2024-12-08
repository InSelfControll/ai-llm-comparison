"use client"

interface ModeSelectorProps {
  selectedMode: string;
  onModeSelect: (mode: string) => void;
}

const modes = [
  { id: 'chat', label: 'Chat', price: '$0.0001-$0.0360/1K tokens' },
  { id: 'embedding', label: 'Embedding', price: '$0.0001-$0.0020/1K tokens' },
  { id: 'image_generation', label: 'Image Generation', price: '$0.0016-$0.1200/image' },
  { id: 'completion', label: 'Completion', price: '$0.0001-$0.0360/1K tokens' },
  { id: 'audio_transcription', label: 'Audio Transcription', price: '$0.0060-$0.0360/minute' },
  { id: 'audio_speech', label: 'TTS (Text To Speech)', price: '$0.0150-$0.0600/1K chars' }
];

export function ModeSelector({ selectedMode, onModeSelect }: ModeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {modes.map(({ id, label, price }) => {
        const isSelected = selectedMode === id;
        
        return (
          <button
            key={id}
            onClick={() => onModeSelect(id)}
            className={`mode-button ${
              isSelected ? 'mode-button-selected' : 'mode-button-unselected'
            }`}
          >
            <div className="flex flex-col items-start">
              <span>{label}</span>
              <span className="text-xs opacity-70">{price}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
} 