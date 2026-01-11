import { AlertTriangle } from "lucide-react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import {
  ErrorBoundary,
  type FallbackProps,
  type ErrorBoundaryProps,
} from "react-error-boundary";
import { Card, Button, Text, Icon, Container, Flex } from "@packages/ui";

type BaseErrorBoundaryProps = {
  children: ErrorBoundaryProps["children"];
  FallbackComponent?: ErrorBoundaryProps["FallbackComponent"];
  resetKey?: ErrorBoundaryProps["resetKeys"];
};

const DefaultFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Container className="flex h-screen items-center justify-center p-4">
      <Card
        variant="elevated"
        padding="lg"
        rounded="2xl"
        className="max-w-md w-full"
      >
        <Flex direction="col" align="center" gap={6} className="text-center">
          <Icon
            size="2xl"
            color="danger"
            className="bg-danger-50 p-3 rounded-full w-16 h-16"
          >
            <AlertTriangle className="w-8 h-8" />
          </Icon>
          <Flex direction="col" gap={2} align="center">
            <Text as="h2" size="xl" weight="bold" color="default">
              오류가 발생했습니다
            </Text>
            <Text color="muted" align="center" className="break-keep">
              {error.message ||
                "예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요."}
            </Text>
          </Flex>
          <Button variant="primary" onClick={resetErrorBoundary} fullWidth>
            다시 시도
          </Button>
        </Flex>
      </Card>
    </Container>
  );
};

const BaseErrorBoundary = ({
  children,
  FallbackComponent = DefaultFallback,
  resetKey,
}: BaseErrorBoundaryProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          resetKeys={resetKey}
          FallbackComponent={FallbackComponent}
          onReset={() => {
            reset();
          }}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default BaseErrorBoundary;
