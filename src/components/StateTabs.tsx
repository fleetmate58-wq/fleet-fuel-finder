import { STATES, type StateCode } from '@/utils/fuelData';

interface StateTabsProps {
  activeState: StateCode;
  onStateChange: (state: StateCode) => void;
}

const StateTabs = ({ activeState, onStateChange }: StateTabsProps) => {
  return (
    <div className="border-b border-border bg-background sticky top-0 z-20">
      <div className="container mx-auto px-4">
        <nav className="flex gap-1 overflow-x-auto" aria-label="Select Australian state">
          {STATES.map((state) => (
            <button
              key={state}
              onClick={() => onStateChange(state)}
              className={`px-5 py-3.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 border-b-2 ${
                activeState === state
                  ? 'text-primary border-primary'
                  : 'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
              }`}
              aria-label={`View fuel prices for ${state}`}
            >
              {state}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default StateTabs;
