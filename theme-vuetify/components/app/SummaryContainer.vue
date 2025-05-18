<script lang="ts" setup></script>

<template>
  <v-row class="d-flex">
    <v-col cols="12" sm="4" class="justify-center align-center d-flex">
      <v-card>
        <LazySummaryLegendTable />
      </v-card>
    </v-col>

    <v-col cols="12" sm="4" class="justify-center align-center d-flex">
      <LazySummaryDoughnutChart />
    </v-col>

    <v-col cols="12" sm="4" class="justify-center align-center d-flex">
      <v-card>
        <LazySummaryLiveInfoTable />
      </v-card>
    </v-col>
  </v-row>
</template>
