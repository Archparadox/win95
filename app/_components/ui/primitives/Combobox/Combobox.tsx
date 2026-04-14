"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Icon from "../../icons";
import classNames from "../../utils/classNames";
import styles from "./Combobox.module.css";

type ComboboxOption = {
  label: string;
  value: string;
};

type ComboboxProps = {
  className?: string;
  defaultOpen?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  focused?: boolean;
  id?: string;
  label?: ReactNode;
  name?: string;
  onValueChange?: (value: string) => void;
  options?: readonly ComboboxOption[];
  orientation?: "vertical" | "horizontal";
  placeholder?: string;
  value?: string;
};

export default function Combobox({
  className,
  defaultOpen = false,
  defaultValue,
  disabled = false,
  focused = false,
  id,
  label,
  name,
  onValueChange,
  options = [],
  orientation = "vertical",
  placeholder,
  value,
}: ComboboxProps) {
  const listboxId = useId();
  const generatedTriggerId = useId();
  const triggerId = id ?? generatedTriggerId;
  const labelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const isControlled = value !== undefined;
  const fallbackOption = defaultValue ? options.find((option) => option.value === defaultValue || option.label === defaultValue) : null;
  const fallbackValue = fallbackOption?.value ?? defaultValue ?? "";
  const [internalValue, setInternalValue] = useState(fallbackValue);
  const [menuOpen, setMenuOpen] = useState(defaultOpen && !disabled);
  const resolvedValue = isControlled ? (value ?? "") : internalValue;
  const selectedOption = options.find((option) => option.value === resolvedValue || option.label === resolvedValue) ?? null;
  const selectedIndex = selectedOption ? options.indexOf(selectedOption) : -1;
  const [activeIndex, setActiveIndex] = useState(selectedIndex >= 0 ? selectedIndex : 0);
  const displayValue = selectedOption?.label ?? resolvedValue;

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    triggerRef.current?.focus();
  }, [menuOpen]);

  function openMenu() {
    if (disabled || options.length === 0) {
      return;
    }

    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setMenuOpen(true);
  }

  function toggleMenu() {
    if (menuOpen) {
      setMenuOpen(false);
      return;
    }

    openMenu();
  }

  function commitValue(nextValue: string) {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
    setMenuOpen(false);
    triggerRef.current?.focus();
  }

  function handleTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (disabled || options.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (!menuOpen) {
        openMenu();
        return;
      }

      setActiveIndex((current) => Math.min(current + 1, options.length - 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (!menuOpen) {
        openMenu();
        return;
      }

      setActiveIndex((current) => Math.max(current - 1, 0));
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(options.length - 1);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (menuOpen) {
        const nextOption = options[activeIndex];
        if (nextOption) {
          commitValue(nextOption.value);
        }
        return;
      }

      openMenu();
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setMenuOpen(false);
      return;
    }

    if (event.key === "Tab") {
      setMenuOpen(false);
    }
  }

  return (
    <div className={classNames(styles.root, styles[orientation], focused && styles.focused, disabled && styles.disabled, className)} ref={rootRef}>
      {label ? (
        <span className={styles.label} id={labelId}>
          {label}
        </span>
      ) : null}
      <span className={styles.control}>
        <button
          aria-activedescendant={menuOpen && activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined}
          aria-controls={listboxId}
          aria-expanded={menuOpen}
          aria-haspopup="listbox"
          aria-labelledby={label ? `${labelId} ${triggerId}` : undefined}
          className={classNames(styles.triggerSurface, menuOpen && styles.triggerSurfacePressed)}
          disabled={disabled}
          id={triggerId}
          onClick={toggleMenu}
          onKeyDown={handleTriggerKeyDown}
          ref={triggerRef}
          role="combobox"
          type="button"
        >
          <span className={styles.valueShell}>
            <span className={classNames(styles.value, !displayValue && styles.placeholder)}>{displayValue || placeholder || "\u00A0"}</span>
          </span>
          <span aria-hidden="true" className={classNames(styles.trigger, menuOpen && styles.triggerPressed)}>
            <Icon className={styles.triggerIcon} name="chevronDown" size="small" />
          </span>
        </button>
        <input
          className={styles.hiddenInput}
          name={name}
          tabIndex={-1}
          type="hidden"
          value={resolvedValue}
        />
        {menuOpen ? (
          <span
            className={styles.menu}
            id={listboxId}
            role="listbox"
          >
            {options.map((option, index) => {
              const isActive = index === activeIndex;
              const isSelected = option.value === resolvedValue || option.label === resolvedValue;

              return (
                <button
                  aria-selected={isSelected}
                  className={classNames(styles.option, isActive && styles.optionActive)}
                  id={`${listboxId}-option-${index}`}
                  key={option.value}
                  onClick={() => commitValue(option.value)}
                  onMouseEnter={() => setActiveIndex(index)}
                  role="option"
                  type="button"
                >
                  {option.label}
                </button>
              );
            })}
          </span>
        ) : null}
      </span>
    </div>
  );
}
