import React from "react";

import { Text } from "@mantine/core";
import { ResponseError as EResponse } from "api-client";

interface ResponseErrorProps {
  responseError: EResponse;
}

export function ResponseError({ responseError }: ResponseErrorProps) {
  return (
    <>
      <Text fw={900} size="64px" c="dimmed">
        {responseError.response.status}
      </Text>
      <Text>An error occured</Text>
    </>
  );
}
