import { RingProgress, Text, SimpleGrid, Paper, Center, Group } from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";

interface StatsRingProps {
  label: string;
  stats: string;
  progress: number;
  color: string;
  icon: "up" | "down";
}

const seed: StatsRingProps[] = [
  { label: "New users", stats: "2,550", progress: 72, color: "yellow", icon: "down" },
  {
    label: "Orders",
    stats: "4,735",
    progress: 52,
    color: "green",
    icon: "up",
  },
];

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

type Props = {};

const Stats = (props: Props) => {
  const stats = seed.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper withBorder radius="md" key={stat.label}>
        <Group>
          <RingProgress
            size={50}
            roundCaps
            thickness={5}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <Icon size="1.4rem" stroke={1.5} />
              </Center>
            }
          />

          <div>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
              {stat.label}
            </Text>
            <Text weight={700} size="xl">
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });
  return (
    <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
      {stats}
    </SimpleGrid>
  );
};

export default Stats;
