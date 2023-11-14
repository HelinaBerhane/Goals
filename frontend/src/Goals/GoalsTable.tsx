import { Table } from "@mantine/core";
import { Goal } from "api-client";
import React from "react";

export interface GoalsTableProps {
  goals: Goal[];
}

export function GoalsTable({ goals }: GoalsTableProps) {
  const rows = goals.map((goal) => (
    <Table.Tr key={goal.id}>
      <Table.Td>{goal.name}</Table.Td>
      <Table.Td>{goal.unit}</Table.Td>
      <Table.Td>{goal.intervalTargetAmount}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Unit</Table.Th>
          <Table.Th>Target amount</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
