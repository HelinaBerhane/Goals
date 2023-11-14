import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Card, Flex, Progress, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { ResponsiveModal } from "./ResponsiveModal";
import { NewGoalForm } from "./NewGoalForm";

import {
  GoalsModel,
  DefaultApi,
  Configuration,
  GetGoalsResponse,
} from "api-client";
import { Link, useLoaderData, useRevalidator } from "react-router-dom";

const goalsApi = new DefaultApi(
  new Configuration({
    basePath: "http://192.168.1.179:8000",
  })
);

export default function Goals() {
  const [
    newGoalDisclosure,
    { toggle: toggleNewGoalDisclosure, close: closeNewGoalDisclosure },
  ] = useDisclosure();

  const { goals } = useLoaderData() as GetGoalsResponse;
  const { revalidate } = useRevalidator();

  return (
    <>
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        spacing={{ base: 10, sm: "xl" }}
      >
        <Card
          radius="md"
          padding="xl"
          bg="blue"
          component="button"
          onClick={toggleNewGoalDisclosure}
          style={{ cursor: "pointer" }}
        >
          <Flex h="100%" w="100%" align="center" justify="center">
            <IconPlus />
          </Flex>
        </Card>
        {goals.map((goal) => (
          <Card
            key={goal.id}
            withBorder
            radius="md"
            padding="xl"
            bg="var(--mantine-color-body)"
            component={Link}
            to={`/${goal.id}`}
          >
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              {goal.name}
            </Text>
            <Text fz="lg" fw={500}>
              $5.431 / $10.000
            </Text>
            <Progress value={54.31} mt="md" size="lg" radius="xl" />
          </Card>
        ))}
      </SimpleGrid>
      <ResponsiveModal
        title="Add goal"
        opened={newGoalDisclosure}
        onClose={closeNewGoalDisclosure}
      >
        <NewGoalForm
          onSubmit={async (createGoalRequest) => {
            await goalsApi.createGoal({ createGoalRequest });
            revalidate();
          }}
        />
      </ResponsiveModal>
    </>
  );
}