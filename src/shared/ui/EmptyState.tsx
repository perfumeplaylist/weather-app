import { Icon, Text, Flex } from "@packages/ui";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = ({
  icon,
  title = "데이터가 없습니다",
  description,
  action,
  className,
}: EmptyStateProps) => {
  return (
    <Flex
      direction="col"
      align="center"
      justify="center"
      gap={4}
      className={`py-12 px-4 ${className || ""}`}
    >
      {icon && (
        <Icon size="2xl" color="muted">
          {icon}
        </Icon>
      )}
      <Flex direction="col" align="center" gap={2}>
        <Text size="lg" weight="medium" color="default">
          {title}
        </Text>
        {description && (
          <Text size="sm" color="muted" align="center">
            {description}
          </Text>
        )}
      </Flex>
      {action && action}
    </Flex>
  );
};


