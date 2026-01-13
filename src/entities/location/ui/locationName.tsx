import { Text } from "@packages/ui";

export const LocationName = ({ name }: { name: string }) => {
  return (
    <Text
      as="h2"
      size="xl"
      weight="medium"
      color="inverse"
      className="opacity-90 mb-2"
    >
      {name}
    </Text>
  );
};
