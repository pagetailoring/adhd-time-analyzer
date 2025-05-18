<script setup lang="ts"></script>

<template>
  <v-responsive class="border rounded">
    <v-app>
      <AppTheHeader />

      <v-main>
        <v-container>
          <LazyAppNewLogsAdding />
          <LazyAppSummaryContainer />
          <LazyAppTheLogsListTable />
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>
