import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { AIModelMode } from '../types';
import { aiModels } from '../utils/aiModels';
import { ArrowUpDown } from 'lucide-react';
import ProviderSelect from './ProviderSelect';
import {
  mapProvider,
  isOtherProvider,
  getDisplayName,
} from '../utils/providerMapping';

interface ModelTableForComparisonProps {
  selectedMode: AIModelMode;
  setSelectedMode: (mode: AIModelMode) => void;
  searchTerm: string;
}

const ProviderCell = ({ provider, logo }) => (
  <div className="provider-cell">
    <div className="flex items-center gap-2">
      <img
        src={logo}
        alt={`${provider} logo`}
        className="h-5 w-5 object-contain"
      />
      <span className="text-sm font-medium">{provider}</span>
    </div>
  </div>
);

const ModelTableForComparison: React.FC<ModelTableForComparisonProps> = ({
  selectedMode,
  setSelectedMode,
  searchTerm,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'ascending' | 'descending';
  }>({ key: null, direction: 'ascending' });
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);

  const filteredModels = useMemo(() => {
    return (
      aiModels[selectedMode]?.filter((model) => {
        const mappedProvider = mapProvider(model.provider);
        const isOther = isOtherProvider(model.provider);
        return (
          model.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedProviders.length === 0 ||
            selectedProviders.includes(mappedProvider) ||
            (isOther && selectedProviders.includes('Other')))
        );
      }) || []
    );
  }, [selectedMode, searchTerm, selectedProviders]);

  const sortedModels = useMemo(() => {
    let sortableModels = [...filteredModels];
    if (sortConfig.key !== null) {
      sortableModels.sort((a, b) => {
        if (sortConfig.key === 'supports_vision') {
          if (
            a.sample_spec.supports_vision === b.sample_spec.supports_vision
          ) {
            return 0;
          }
          return (
            (a.sample_spec.supports_vision ? 1 : -1) *
            (sortConfig.direction === 'ascending' ? 1 : -1)
          );
        } else {
          if (a.sample_spec[sortConfig.key!] < b.sample_spec[sortConfig.key!]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a.sample_spec[sortConfig.key!] > b.sample_spec[sortConfig.key!]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        }
      });
    }
    return sortableModels;
  }, [filteredModels, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const columns = [
    {
      header: "Model",
      accessorKey: "name",
    },
    {
      header: "Provider",
      accessorKey: "provider",
      cell: ({ row }) => (
        <ProviderCell 
          provider={row.original.provider} 
          logo={row.original.logo} 
        />
      ),
    },
    {
      header: "Input Length ↕",
      accessorKey: "sample_spec.max_input_tokens",
    },
    {
      header: "Output Length ↕",
      accessorKey: "sample_spec.max_output_tokens",
    },
    {
      header: "Input Price (per 1M tokens) ↕",
      accessorKey: "sample_spec.input_cost_per_token",
      cell: ({ row }) => `$${(row.original.sample_spec.input_cost_per_token * 1000000).toFixed(2)}`,
    },
    {
      header: "Output Price (per 1M tokens) ↕",
      accessorKey: "sample_spec.output_cost_per_token",
      cell: ({ row }) => `$${(row.original.sample_spec.output_cost_per_token * 1000000).toFixed(2)}`,
    },
    {
      header: "Supports Vision ↕",
      accessorKey: "sample_spec.supports_vision",
      cell: ({ row }) => row.original.sample_spec.supports_vision ? "✓" : "✕",
    },
    {
      header: "Supports Function Calling",
      accessorKey: "sample_spec.supports_function_calling",
      cell: ({ row }) => row.original.sample_spec.supports_function_calling ? "✓" : "✕",
    },
    {
      header: "Supports Parallel Function Calling",
      accessorKey: "sample_spec.supports_parallel_function_calling",
      cell: ({ row }) => row.original.sample_spec.supports_parallel_function_calling ? "✓" : "✕",
    }
  ];

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[200px] min-w-[200px]">Provider</TableHead>
              <TableHead>Model</TableHead>
              <TableHead className="text-right">Input Cost</TableHead>
              <TableHead className="text-right">Output Cost</TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" onClick={() => requestSort('max_tokens')}>
                  Max Tokens
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedModels.map((model, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <ProviderCell
                    provider={getDisplayName(model.provider)}
                    logo={model.logo}
                  />
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {model.name}
                </TableCell>
                <TableCell className="text-right">
                  ${Number(model.sample_spec.input_cost_per_token).toFixed(8)}
                </TableCell>
                <TableCell className="text-right">
                  ${Number(model.sample_spec.output_cost_per_token).toFixed(8)}
                </TableCell>
                <TableCell className="text-right">
                  {model.sample_spec.max_tokens?.toLocaleString() || 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ModelTableForComparison;