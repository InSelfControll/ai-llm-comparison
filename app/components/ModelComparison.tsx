import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import PricingCalculator from './PricingCalculator';
import VersusComparison from './VersusComparison';
import ModelTableForCalculator from './ModelTableforCalculator';
import ModelTableForComparison from './ModelTableForComparison';
import { AIModelMode } from '../types';
import { Button } from "@/components/ui/button"
import { ModeSelector } from './ModeSelector';

interface ModelComparisonProps {
  showPricingCalculator: boolean;
  setShowPricingCalculator: (show: boolean) => void;
  showVersusComparison: boolean;
  setShowVersusComparison: (show: boolean) => void;
}

const ModeButton = ({ mode, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 rounded-lg text-sm font-medium transition-colors
      ${isSelected 
        ? 'bg-primary text-primary-foreground'
        : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
      }
    `}
  >
    {mode === 'audio_speech' ? 'TTS (Text To Speech)' : mode}
  </button>
);

export default function ModelComparison({
  showPricingCalculator,
  setShowPricingCalculator,
  showVersusComparison,
  setShowVersusComparison
}: ModelComparisonProps) {
  const [selectedMode, setSelectedMode] = useState<string>('chat');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-background pt-4 pb-2 border-b">
        <ModeSelector
          selectedMode={selectedMode}
          onModeSelect={setSelectedMode}
        />
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search models..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showPricingCalculator && (
        <PricingCalculator inputAmount={0} setInputAmount={function (amount: number): void {
          throw new Error('Function not implemented.');
        } } outputAmount={0} setOutputAmount={function (amount: number): void {
          throw new Error('Function not implemented.');
        } } apiCalls={0} setApiCalls={function (calls: number): void {
          throw new Error('Function not implemented.');
        } } inputType={''} setInputType={function (type: string): void {
          throw new Error('Function not implemented.');
        } } outputType={''} setOutputType={function (type: string): void {
          throw new Error('Function not implemented.');
        } } />
      )}
      
      {showVersusComparison && (
        <VersusComparison
          selectedMode={selectedMode as AIModelMode}
          setSelectedMode={setSelectedMode}
          searchTerm={searchTerm}
        />
      )}
      
      {showPricingCalculator ? (
        <ModelTableForCalculator
          selectedMode={selectedMode as AIModelMode}
          setSelectedMode={setSelectedMode}
          searchTerm={searchTerm} inputAmount={0} outputAmount={0} apiCalls={0} inputType={''} outputType={''}        />
      ) : (
        <ModelTableForComparison
          selectedMode={selectedMode as AIModelMode}
          setSelectedMode={setSelectedMode}
          searchTerm={searchTerm}
        />
      )}
    </div>
  );
}