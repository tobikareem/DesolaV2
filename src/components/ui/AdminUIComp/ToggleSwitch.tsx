import { Btn } from "../Button";

interface ToggleSwitchProps {
  enabled: boolean;
  onToggle: () => void;
}

export const ToggleSwitch = ({ enabled, onToggle }: ToggleSwitchProps) => {
  return (
    <button
      onClick={onToggle}
      type="button"
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out
          ${enabled ? 'bg-blue-600' : 'bg-gray-300'}`}
      role="switch"
      aria-checked={enabled}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out
            ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );
};
