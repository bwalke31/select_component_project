import { useState } from "react";
import styles from "./select.module.css";

export type SelectOption = {
  label: string;
  value: number;
};

type SelectProps = {
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
  options: SelectOption[];
};

export function Select({ value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Used to clear the value field
  // onChange is the setValue function => Will set the passed 'value' to undefined and show nothing
  function clearOptions() {
    onChange(undefined);
  }
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
          e.stopPropagation;
          clearOptions();
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option) => (
          <li key={option.label} className={styles.option}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
