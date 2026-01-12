import { Flex, Text } from "@packages/ui";

export const Current = ({ value }: { value: number }) => (
  <Text size="6xl" weight="bold" color="inverse">
    {value}°
  </Text>
);

export const Range = ({ min, max }: { min: number; max: number }) => (
  <Flex gap={4} className="opacity-80 mt-2">
    <Text size="sm">최고 {max}°</Text>
    <Text size="sm">|</Text>
    <Text size="sm">최저 {min}°</Text>
  </Flex>
);
