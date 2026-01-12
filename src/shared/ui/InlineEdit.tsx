import { useState, useRef, useEffect } from "react";
import { Input, Button, Flex, Icon } from "@packages/ui";
import { Check, X, Edit2 } from "lucide-react";

interface InlineEditProps {
  value: string;
  onSave: (value: string) => void;
  onCancel?: () => void;
  maxLength?: number;
  placeholder?: string;
  className?: string;
}

export const InlineEdit = ({
  value,
  onSave,
  onCancel,
  maxLength = 20,
  placeholder = "별칭을 입력하세요",
  className,
}: InlineEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setEditValue(value);
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmed = editValue.trim();
    onSave(trimmed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
    onCancel?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <Flex direction="row" align="center" gap={2} className={className}>
        <Input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          maxLength={maxLength}
          inputSize="sm"
          className="flex-1"
        />
        <Button
          variant="primary"
          size="sm"
          onClick={handleSave}
          disabled={editValue.length > maxLength}
        >
          <Icon size="xs">
            <Check />
          </Icon>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleCancel}>
          <Icon size="xs">
            <X />
          </Icon>
        </Button>
      </Flex>
    );
  }

  return (
    <Flex direction="row" align="center" gap={2} className={className}>
      <span className="flex-1">{value || placeholder}</span>
      <Button variant="ghost" size="sm" onClick={handleStartEdit}>
        <Icon size="xs" color="muted">
          <Edit2 />
        </Icon>
      </Button>
    </Flex>
  );
};


