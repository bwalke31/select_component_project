import { useEffect, useState } from "react";
import styles from "./select.module.css";

export type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
  options: SelectOption[];
};

export function Select({ value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // Used to clear the value field
  // onChange is the setValue function => Will set the passed 'value' to undefined and show nothing
  function clearOptions() {
    onChange(undefined);
  }

  // Function for selecting an option
  // Will call setValue for new option
  function selectOption(option: SelectOption) {
    if (option !== value) onChange(option);
  }

  // Function for highlighting the selected option
  function isOptionSelected(option: SelectOption) {
    return option === value;
  }

  // Each time we open the drop down, we want the highlighted index at 0
  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      // When clicking off the drop down
      onBlur={() => {
        setIsOpen(false);
      }}
      onClick={() => setIsOpen((prev) => !prev)}
      // Will allow to highlight when clicked
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>{value?.label}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            // Will highlight when hovering over option
            onMouseEnter={() => setHighlightedIndex(index)}
            // Pass the options back to setValue so that value.label can be updated
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            key={option.value}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ""
            }
              ${index === highlightedIndex ? styles.highlighted : ""}
              `}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
