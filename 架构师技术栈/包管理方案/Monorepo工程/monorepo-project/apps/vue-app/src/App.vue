<script setup lang="ts">
import { add } from "@monorepo/utils";
import { Button } from "@monorepo/components";

const result = add(3, 5);
</script>

<template>
  <h1>Vue Monorepo</h1>
  <p>3 + 5 = {{ result }}</p>

  <Button>Button</Button>
</template>
